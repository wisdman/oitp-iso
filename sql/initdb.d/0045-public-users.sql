SET search_path = "$user";

CREATE VIEW public.users AS
  SELECT
    u."id",
    u."email",
    u."phone",
    u."password",
    u."certificate",
    u."oauth"
  FROM
    private.users AS u
  WHERE
    u."deleted" IS NULL
    AND
    u."enabled";

GRANT SELECT ON public.users TO "api-public";
