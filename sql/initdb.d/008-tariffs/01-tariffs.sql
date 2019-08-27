-- DROP VIEW private.tariffs CASCADE;
CREATE TABLE private.tariffs (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "archive" timestamp without time zone DEFAULT NULL,
  "default" boolean NOT NULL DEFAULT FALSE,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "public" boolean NOT NULL DEFAULT FALSE,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL,

  "title"       varchar(64) NOT NULL,
  "description" text        NOT NULL DEFAULT '',

  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL DEFAULT '1 mon'::interval,

  CONSTRAINT private__tariffs__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__tariffs__check__default CHECK (NOT "default" OR ("default" AND "public")),
  CONSTRAINT private__tariffs__check__title CHECK (char_length("title") > 0),
  CONSTRAINT private__tariffs__check__amount CHECK ("amount" > 0 OR ("amount" = 0 AND NOT "default"))
);

SELECT private.init_trash_scope('private.tariffs');

CREATE INDEX private__tariffs__idx__archive_enabled ON private.tariffs USING btree ("archive", "enabled");
CREATE INDEX private__tariffs__idx__ts_expires ON private.tariffs USING btree ("ts", "expires");
CREATE INDEX private__tariffs__idx__public ON private.tariffs USING btree ("public");

CREATE UNIQUE INDEX private__tariffs__unique_idx__default ON private.tariffs USING btree ("default")
  WHERE "default" AND "archive" IS NULL;

CREATE OR REPLACE FUNCTION private.tariffs__trigger__expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = coalesce(NEW."expires", NEW."ts" + private.get_config_as_text('tariffDefaultLifetime')::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER expires BEFORE INSERT OR UPDATE ON private.tariffs FOR EACH ROW
  EXECUTE PROCEDURE private.tariffs__trigger__expires();
