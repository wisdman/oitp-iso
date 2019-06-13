SET search_path = "$user";

-- one-time references
CREATE TABLE private.otr (
  "id"    char(128) NOT NULL,
  "owner" uuid      NOT NULL,

  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT otr__idx__pkey PRIMARY KEY ("id", "owner"),
  CONSTRAINT otr__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT otr__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.otr__unique_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = public.unique_id();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER otr__unique_id__trigger
  BEFORE INSERT ON private.otr FOR EACH ROW
  EXECUTE PROCEDURE private.otr__unique_id();

CREATE OR REPLACE FUNCTION private.otr__expires() RETURNS trigger AS $$
DECLARE otrInterval interval;
BEGIN
  SELECT c."value"::text::interval INTO otrInterval FROM private.config c WHERE c."key" = 'otrInterval';
  NEW."expires" = timezone('UTC', now() + otrInterval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER otr__expires__trigger
  BEFORE INSERT OR UPDATE ON private.otr FOR EACH ROW
  EXECUTE PROCEDURE private.otr__expires();

CREATE OR REPLACE FUNCTION private.users__dropOTR() RETURNS trigger AS $$
BEGIN
  IF (NEW."deleted" IS NOT NULL OR NOT NEW."enabled") THEN
    DELETE FROM private.otr otr WHERE otr."owner" = NEW."id";
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER users__dropOTR__trigger
  AFTER UPDATE ON private.users FOR EACH ROW
  EXECUTE PROCEDURE private.users__dropOTR();

CREATE OR REPLACE FUNCTION private.otr__prune() RETURNS void AS $$
  DELETE FROM private.otr WHERE "expires" < timezone('UTC', now());
$$ LANGUAGE SQL;
