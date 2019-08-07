SET search_path = "$user";

-- DROP VIEW private.tariffs CASCADE;
CREATE TABLE private.tariffs (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "archive" timestamp without time zone DEFAULT NULL,
  "default" boolean NOT NULL DEFAULT FALSE,
  "deleted" timestamp without time zone DEFAULT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "public" boolean NOT NULL DEFAULT FALSE,

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL,

  "title"       varchar(64) NOT NULL,
  "description" text        NOT NULL DEFAULT '',

  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL DEFAULT '1 mon'::interval,

  CONSTRAINT tariffs__pkey PRIMARY KEY ("id"),

  CONSTRAINT tariffs__check__default CHECK (NOT "default" OR ("default" AND "public")),
  CONSTRAINT tariffs__check__title CHECK (char_length("title") > 0),
  CONSTRAINT tariffs__check__amount CHECK ("amount" > 0 OR ("amount" = 0 AND NOT "default"))
);

CREATE INDEX tariffs__idx__deleted_enabled ON private.tariffs USING btree ("archive", "deleted", "enabled");
CREATE INDEX tariffs__idx__issue_expires ON private.tariffs USING btree ("issue", "expires");
CREATE INDEX tariffs__idx__public ON private.tariffs USING btree ("public");

CREATE UNIQUE INDEX tariffs__unique_idx__default ON private.tariffs USING btree ("default")
  WHERE "default" AND "deleted" IS NULL AND "archive" IS NULL;

CREATE OR REPLACE FUNCTION private.tariffs__trigger__expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = coalesce(NEW."expires", NEW."issue" + private.get_config('tariffDefaultLifetime')::text::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER expires BEFORE INSERT OR UPDATE ON private.tariffs FOR EACH ROW
  EXECUTE PROCEDURE private.tariffs__trigger__expires();

CREATE OR REPLACE FUNCTION private.tariffs__trigger__check_default() RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM private.tariffs
    WHERE "archive" IS NULL
      AND "deleted" IS NULL
      AND "enabled"
      AND "issue" <= timezone('UTC', now())
      AND "expires" > timezone('UTC', now())
      AND "default"
  ) THEN
    RAISE integrity_constraint_violation USING MESSAGE = 'Incorrect default tariff';
  END IF;
  RETURN OLD;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER check_default AFTER UPDATE OR DELETE ON private.tariffs FOR EACH ROW
  EXECUTE PROCEDURE private.tariffs__trigger__check_default();
