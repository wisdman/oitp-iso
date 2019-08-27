-- DROP TABLE private.users_sms CASCADE;
CREATE UNLOGGED TABLE private.users_sms (
  "id"    smallint NOT NULL DEFAULT public.random_sms_code(),
  "owner" uuid     NOT NULL,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL
    DEFAULT timezone('UTC', now() + private.get_config_as_text('smsInterval')::interval),

  "options" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT private__users_sms__pkey PRIMARY KEY ("owner", "id"),

  CONSTRAINT private__users_sms__check__id CHECK (public.check_sms_code("id")),
  CONSTRAINT private__users_sms__check__options CHECK (jsonb_typeof("options") = 'object'),

  CONSTRAINT private__users_sms__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX private__users_sms__idx__ts_expires ON private.users_sms USING btree ("ts", "expires");

CREATE OR REPLACE FUNCTION private.users_sms__trigger__send() RETURNS trigger AS $$
BEGIN
  SELECT private.msg_sms('sms-auth'::public.msg_template_id, "phone", "profile")
  FROM private.users
  WHERE "id" = NEW."owner";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send AFTER INSERT ON private.users_sms FOR EACH ROW
  EXECUTE PROCEDURE private.users_sms__trigger__send();
