SET search_path = "$user";

CREATE TABLE private.sessions (
  "id"    char(128) NOT NULL,
  "owner" uuid      NOT NULL,

  "ip" inet NOT NULL, -- IPv4 or IPv6 user address
  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting

  "ts" timestamp without time zone NOT NULL,
  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT sessions__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT sessions__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT sessions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'object'),

  CONSTRAINT sessions__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.sessions__unique_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = public.unique_id();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__unique_id__trigger
  BEFORE INSERT ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__unique_id();

CREATE OR REPLACE FUNCTION private.sessions__time() RETURNS trigger AS $$
DECLARE sessionInterval interval;
BEGIN
  SELECT c."value"::text::interval INTO sessionInterval FROM private.config c WHERE c."key" = 'sessionInterval';
  NEW."expires" = timezone('UTC', now() + sessionInterval);
  NEW."ts" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__time__trigger
  BEFORE INSERT OR UPDATE ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__time();

CREATE OR REPLACE FUNCTION private.users__dropSessions() RETURNS trigger AS $$
BEGIN
  IF (NEW."deleted" OR NOT NEW."enabled") THEN
    DELETE FROM private.sessions s WHERE s."owner" = NEW."id";
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER users__dropSessions__trigger
  AFTER UPDATE ON private.users FOR EACH ROW
  EXECUTE PROCEDURE private.users__dropSessions();

CREATE OR REPLACE FUNCTION private.sessions__prune() RETURNS void AS $$
  DELETE FROM private.sessions WHERE "expires" < timezone('UTC', now());
$$ LANGUAGE SQL;
