SET search_path = "$user";

-- DROP TABLE private.users_invites CASCADE;
CREATE TABLE private.users_invites (
  "id" char(64) NOT NULL DEFAULT public.unique_id(),
  "master" uuid DEFAULT NULL,

  "email" varchar(256) NOT NULL,

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT users_invites__pkey PRIMARY KEY ("id"),

  CONSTRAINT users_invites__check__id CHECK (public.check_unique_id("id")),
  CONSTRAINT users_invites__check__email CHECK (public.check_email("email")),

  CONSTRAINT users_invites__fkey__master FOREIGN KEY ("master")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE OR REPLACE FUNCTION private.users_invites__trigger__send_self() RETURNS trigger AS $$
BEGIN
  PERFORM private.message_new_email('email-self-invite'::public.msg_template_id, NEW."email", '{}'::jsonb);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send_self AFTER INSERT OR UPDATE ON private.users_invites FOR EACH ROW WHEN (NEW."master" IS NULL)
  EXECUTE PROCEDURE private.users_invites__trigger__send_self();

CREATE OR REPLACE FUNCTION private.users_invites__trigger__send_master() RETURNS trigger AS $$
BEGIN
  SELECT private.message_new_email('email-invite'::public.msg_template_id, "email", jsonb_build_object(
    'name', "profile"->>'name',
    'surname', "profile"->>'surname'
  ))
  FROM private.users
  WHERE "id" = NEW."master";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER send_master AFTER INSERT OR UPDATE ON private.users_invites FOR EACH ROW WHEN (NEW."master" IS NOT NULL)
  EXECUTE PROCEDURE private.users_invites__trigger__send_master();
