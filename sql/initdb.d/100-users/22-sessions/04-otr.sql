-- DROP TABLE private.users_otr CASCADE;
CREATE UNLOGGED TABLE private.users_otr (
  "id"    char(64) NOT NULL DEFAULT public.unique_id(),
  "owner" uuid     NOT NULL,

  "issue"   timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL
    DEFAULT timezone('UTC', now() + private.get_config_as_text('otrInterval')::interval),

  "options" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT users_otr__pkey PRIMARY KEY ("owner"),

  CONSTRAINT users_otr__check__id CHECK (public.check_unique_id("id")),
  CONSTRAINT users_otr__check__options CHECK (jsonb_typeof("options") = 'object'),

  CONSTRAINT users_otr__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX users_otr__idx__issue_login_expires ON private.users_otr USING btree ("issue", "expires");

CREATE OR REPLACE FUNCTION private.users_otr__trigger__send() RETURNS trigger AS $$
BEGIN
  SELECT private.msg_email('email-otr'::public.msg_template_id, "email", "profile")
  FROM private.users
  WHERE "id" = NEW."owner";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send AFTER INSERT ON private.users_otr FOR EACH ROW
  EXECUTE PROCEDURE private.users_otr__trigger__send();
