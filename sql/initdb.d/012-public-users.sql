SET search_path = "$user";

CREATE VIEW public.users AS
  SELECT
    u."id",
    u."enabled",
    u."roles",

    u."email",
    u."phone",

    u."name",
    u."image",
    u."birthday"
  FROM private.users u
  WHERE NOT u."deleted";




-- CREATE OR REPLACE FUNCTION public.user__get_by_id(uuid)
-- RETURNS table (
--   "id"    uuid,

--   "email" varchar(256),
--   "phone" varchar(15),

--   "name"  text,
--   "image" oid
-- ) AS $$
--   SELECT u."id", u."email", u."phone", u."name", u."image" FROM private.users u
--   WHERE u."id" = $1;
-- $$ LANGUAGE SQL STABLE SECURITY DEFINER;


-- CREATE OR REPLACE FUNCTION public.user__get_by_session(text)
-- RETURNS table (
--   "id"    uuid,

--   "email" varchar(256),
--   "phone" varchar(15),

--   "name"  text,
--   "image" oid
-- ) AS $$
--   SELECT u."id", u."email", u."phone", u."name", u."image" FROM private.sessions s
--   LEFT JOIN private.users u ON (u."id" = s."user")
--   WHERE s."id" = $1;
-- $$ LANGUAGE SQL STABLE SECURITY DEFINER;


-- CREATE OR REPLACE FUNCTION public.user__auth_by_session(text)
-- RETURNS setof uuid AS $$
--   SELECT u."id" FROM private.sessions s
--   LEFT JOIN private.users u ON (u."id" = s."user")
--   WHERE s."id" = $1;
-- $$ LANGUAGE SQL STABLE SECURITY DEFINER;


-- CREATE OR REPLACE FUNCTION public.user__login_by_email(text, text)
-- RETURNS table (
--   "id" char(128),
--   "expires" text
-- ) AS $$
--   INSERT INTO private.sessions ("user")
--     SELECT u."id"
--     FROM private.users u
--     WHERE u."email" = $1 AND u."password" = digest($2, 'sha512')
--   RETURNING "id", to_char("expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') as "expires";
-- $$ LANGUAGE SQL VOLATILE SECURITY DEFINER;


-- CREATE OR REPLACE FUNCTION public.user__logout_by_session(text)
-- RETURNS setof char(128) AS $$
--   DELETE FROM private.sessions s
--   WHERE s."id" = $1
--   RETURNING "id";
-- $$ LANGUAGE SQL VOLATILE SECURITY DEFINER;
