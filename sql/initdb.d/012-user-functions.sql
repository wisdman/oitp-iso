SET search_path = "$user";

CREATE FUNCTION public.user__add(text, text, text)
RETURNS table (
  "id" char(128),
  "expires" text
) AS $$
  WITH t_user AS (
    INSERT INTO private.users("name", "email", "password")
    VALUES($1, $2, digest($3, 'sha512'))
    RETURNING "id" as "expires"
  ) INSERT INTO private.sessions("user")
    SELECT * FROM t_user
    RETURNING "id", to_char("expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') as "expires";
$$ LANGUAGE SQL VOLATILE SECURITY DEFINER;

CREATE FUNCTION public.user__login_by_email(text, text)
RETURNS table (
  "id" char(128),
  "expires" text
) AS $$
  INSERT INTO private.sessions ("user")
    SELECT u."id"
    FROM private.users u
    WHERE u."email" = $1 AND u."password" = digest($2, 'sha512')
  RETURNING "id", to_char("expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') as "expires";
$$ LANGUAGE SQL VOLATILE SECURITY DEFINER;

CREATE FUNCTION public.user__logout(text)
RETURNS setof char(128) AS $$
  DELETE FROM private.sessions s
  WHERE s."id" = $1
  RETURNING "id";
$$ LANGUAGE SQL VOLATILE SECURITY DEFINER;

CREATE FUNCTION public.user__by_session(text)
RETURNS table (
  "id" uuid,
  "roles" public.users__role[]
) AS $$
  SELECT
    u."id",
    u."roles"
  FROM private.sessions s
  JOIN private.users u ON (s."user" = u."id")
  WHERE s."id" = $1
$$ LANGUAGE SQL STABLE SECURITY DEFINER;