-- DROP VIEW private.tariffs_codes CASCADE;
CREATE TABLE private.tariffs_codes (
  "code" varchar(32) NOT NULL,
  "tariff" uuid NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  "ts" timestamp without time zone NOT NULL,
  "expires" timestamp without time zone NOT NULL,

  "title"       varchar(64) NOT NULL,
  "description" text        NOT NULL,

  CONSTRAINT private__tariffs_codes__pkey PRIMARY KEY ("code"),

  CONSTRAINT private__tariffs_codes__check__code CHECK ("code" ~ '^[A-Z0-9]{5,32}$'),

  CONSTRAINT private__tariffs_codes__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX private__tariffs_codes__idx__enabled ON private.tariffs_codes USING btree ("enabled");
CREATE INDEX private__tariffs_codes__idx__issue_expires ON private.tariffs_codes USING btree ("ts", "expires");

CREATE OR REPLACE FUNCTION private.tariffs_codes__trigger__issue_expires() RETURNS trigger AS $$
BEGIN
  SELECT
    coalesce(NEW."ts", _issue, timezone('UTC', now())),
    coalesce(NEW."expires", _expires)
  INTO STRICT
    NEW."ts",
    NEW."expires"
  FROM private.tariffs WHERE "id" = NEW."tariff";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER issue_expires BEFORE INSERT OR UPDATE ON private.tariffs_codes FOR EACH ROW
  EXECUTE PROCEDURE private.tariffs_codes__trigger__issue_expires();
