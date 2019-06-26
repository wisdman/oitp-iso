SET search_path = "$user";

CREATE VIEW public.self AS
  SELECT
    u."id",

    u."email",
    u."emailIsValid",

    u."phone",
    u."phoneIsValid",

    NULL AS "password",
    u."certificate",
    u."oauth",

    u."name",
    u."surname",
    u."avatar",

    u."profile",
    u."tariff",
    u."timezone"
  FROM
    private.users AS u
  WHERE
    u."deleted" IS NULL
    AND
    u."enabled"
    AND
    u."id" = current_setting('app.sessionUser')::uuid;

GRANT SELECT ON public.self TO "api-public";
