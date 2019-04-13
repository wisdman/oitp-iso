SET search_path = "$user";

CREATE TABLE private.sessions (
  "id" char(128) NOT NULL,
  "user" uuid NOT NULL,
  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT sessions__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT sessions__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT sessions__fkey__user
    FOREIGN KEY ("user")
    REFERENCES private.users("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE FUNCTION private.sessions__new_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = encode(digest(uuid_generate_v1mc()::text || uuid_generate_v4()::text, 'sha512'), 'hex')::char(128);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__new_id__trigger
  BEFORE INSERT ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__new_id();

CREATE FUNCTION private.sessions__update_expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = timezone('UTC', now() + '1 month'::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__update_expires__trigger
  BEFORE INSERT OR UPDATE ON private.sessions FOR EACH ROW
  EXECUTE PROCEDURE private.sessions__update_expires();
