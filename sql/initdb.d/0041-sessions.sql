SET search_path = "$user";

CREATE TABLE private.sessions (
  "id"    char(128) NOT NULL,
  "owner" uuid      NOT NULL,

  "ip" inet NOT NULL, -- IPv4 or IPv6 user address
  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting

  "login" timestamp without time zone NOT NULL,
  "logout"  timestamp without time zone DEFAULT NULL,

  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT sessions__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT sessions__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT sessions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'object'),

  CONSTRAINT sessions__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION private.sessions__new() RETURNS trigger AS $$
BEGIN
  NEW."id" = public.unique_id();
  NEW."login" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__new__trigger
  BEFORE INSERT ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__new();

CREATE OR REPLACE FUNCTION private.sessions__expires() RETURNS trigger AS $$
DECLARE sessionInterval interval;
BEGIN
  SELECT c."value"::text::interval INTO sessionInterval FROM private.config c WHERE c."key" = 'sessionInterval';
  NEW."expires" = timezone('UTC', now() + sessionInterval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__expires__trigger
  BEFORE INSERT OR UPDATE ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__expires();
