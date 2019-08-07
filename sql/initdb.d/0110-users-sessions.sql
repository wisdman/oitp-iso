SET search_path = "$user";

-- DROP TABLE private.users_sessions CASCADE;
CREATE TABLE private.users_sessions (
  "id"    char(64) NOT NULL DEFAULT public.unique_id(),
  "owner" uuid     NOT NULL,

  "ip" inet NOT NULL, -- IPv4 or IPv6 user address
  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting

  "login"   timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "logout"  timestamp without time zone DEFAULT NULL,
  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT users_sessions__pkey PRIMARY KEY ("id"),

  CONSTRAINT users_sessions__check__id CHECK (public.check_unique_id("id")),
  CONSTRAINT users_sessions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'object'),

  CONSTRAINT users_sessions__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX users_sessions__idx__login_logout_expires ON private.users_sessions USING btree ("login", "logout", "expires");

CREATE OR REPLACE FUNCTION private.users_sessions__trigger__expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = timezone('UTC', now() + private.get_config('sessionInterval')::text::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER expires BEFORE INSERT OR UPDATE ON private.users_sessions FOR EACH ROW
  EXECUTE PROCEDURE private.users_sessions__trigger__expires();


