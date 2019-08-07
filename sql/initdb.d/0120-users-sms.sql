SET search_path = "$user";

-- DROP TABLE private.users_sms CASCADE;
CREATE TABLE private.users_sms (
  "id"    smallint NOT NULL DEFAULT public.random_sms_code(),
  "owner" uuid     NOT NULL,

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL,

  "options" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT users_sms__pkey PRIMARY KEY ("owner", "id"),

  CONSTRAINT users_sms__check__id CHECK (public.check_sms_code("id")),
  CONSTRAINT users_sms__check__options CHECK (jsonb_typeof("options") = 'object'),

  CONSTRAINT users_sms__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX users_sms__idx__issue_login_expires ON private.users_sms USING btree ("issue", "expires");

CREATE OR REPLACE FUNCTION private.users_sms__trigger__expires() RETURNS trigger AS $$
BEGIN
  NEW."expires" = timezone('UTC', now() + private.get_config('smsInterval')::text::interval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER expires BEFORE INSERT OR UPDATE ON private.users_sms FOR EACH ROW
  EXECUTE PROCEDURE private.users_sms__trigger__expires();

CREATE OR REPLACE FUNCTION private.users_sms__trigger__send() RETURNS trigger AS $$
DECLARE
  _template public.msg_template_id := coalesce(NEW."options"->>'template', 'sms-auth')::public.msg_template_id;
BEGIN
  SELECT private.msg_sms(_template, "phone", "profile")
  FROM private.users
  WHERE "id" = NEW."owner";

  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send AFTER INSERT ON private.users_sms FOR EACH ROW
  EXECUTE PROCEDURE private.users_sms__trigger__send();
