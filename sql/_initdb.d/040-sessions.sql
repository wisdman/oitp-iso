SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

-- Users sessions datatable
CREATE TABLE sessions (
  "id" char(128) NOT NULL,
  "ip" inet NOT NULL,
  "user" uuid NOT NULL,
  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT sessions__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT sessions__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT sessions__fkey__user
    FOREIGN KEY ("user")
    REFERENCES users("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

-- Set new id
CREATE FUNCTION sessions__new_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = get_unique_id();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__new_id__trigger
  BEFORE INSERT ON sessions FOR EACH ROW
  EXECUTE PROCEDURE sessions__new_id();

-- Prevent change id
CREATE TRIGGER sessions__prevent_change_id__trigger
  BEFORE UPDATE ON sessions FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

-- Update expires
CREATE FUNCTION sessions__update_expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = timezone('UTC', now() + '1 month'::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sessions__update_expires__trigger
  BEFORE UPDATE ON sessions FOR EACH ROW
  EXECUTE PROCEDURE sessions__update_expires();

-- Scann indexes
CREATE INDEX sessions__idx__fkey_user ON sessions USING btree("user");
CREATE INDEX sessions__idx__expires   ON sessions USING btree("expires");

-- Prune old sessions
CREATE FUNCTION sessions__prune_old() RETURNS void AS $$
  DELETE FROM sessions WHERE "expires" < timezone('UTC', now());
$$ LANGUAGE SQL;
