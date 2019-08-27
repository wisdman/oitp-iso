-- DROP TABLE private.users_invites_email CASCADE;
CREATE TABLE private.users_invites_email (
  "email" varchar(256) NOT NULL,

  CONSTRAINT private__users_invites_email__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__users_invites_email__check__email CHECK (public.check_email("email")),

  CONSTRAINT private__users_invites_email__fkey__master FOREIGN KEY ("master")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE SET NULL
) INHERITS (private.users_invites);

CREATE INDEX private__users_invites_email__idx__id ON private.users_invites_email USING btree ("id");

CREATE OR REPLACE FUNCTION private.users_invites_email__trigger__send_self() RETURNS trigger AS $$
BEGIN
  PERFORM private.msg_email('email-self-invite'::public.msg_template_id, NEW."email", jsonb_build_object(
    'invite', NEW."id"
  ));
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send_self AFTER INSERT ON private.users_invites_email FOR EACH ROW WHEN (NEW."master" IS NULL)
  EXECUTE PROCEDURE private.users_invites_email__trigger__send_self();

CREATE OR REPLACE FUNCTION private.users_invites_email__trigger__send_master() RETURNS trigger AS $$
BEGIN
  SELECT private.msg_email('email-invite'::public.msg_template_id, "email", jsonb_build_object(
    'invite', NEW."id",
    'name', "profile"->>'name',
    'surname', "profile"->>'surname'
  ))
  FROM ONLY private.users
  WHERE "id" = NEW."master";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send_master AFTER INSERT ON private.users_invites_email FOR EACH ROW WHEN (NEW."master" IS NOT NULL)
  EXECUTE PROCEDURE private.users_invites_email__trigger__send_master();
