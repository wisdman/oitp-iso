SET search_path = "$user";

-- DROP TABLE private.users_otr CASCADE;
CREATE TABLE private.users_otr (
  "id"    char(64) NOT NULL DEFAULT public.unique_id(),
  "owner" uuid     NOT NULL,

  "issue"   timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL,

  "options" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT users_otr__pkey PRIMARY KEY ("owner"),

  CONSTRAINT users_otr__check__id CHECK (public.check_unique_id("id")),
  CONSTRAINT users_otr__check__options CHECK (jsonb_typeof("options") = 'object'),

  CONSTRAINT users_otr__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX users_otr__idx__issue_login_expires ON private.users_otr USING btree ("issue", "expires");

CREATE OR REPLACE FUNCTION private.users_otr__trigger__expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = timezone('UTC', now() + private.get_config('otrInterval')::text::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER expires BEFORE INSERT OR UPDATE ON private.users_otr FOR EACH ROW
  EXECUTE PROCEDURE private.users_otr__trigger__expires();

CREATE OR REPLACE FUNCTION private.users_otr__trigger__send() RETURNS trigger AS $$
DECLARE
  _template public.msg_template_id := coalesce(NEW."options"->>'template', 'email-otr')::public.msg_template_id;
BEGIN
  SELECT private.msg_email(_template, "email", "profile")
  FROM private.users
  WHERE "id" = NEW."owner";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send AFTER INSERT ON private.users_otr FOR EACH ROW
  EXECUTE PROCEDURE private.users_otr__trigger__send();
