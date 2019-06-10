SET search_path = "$user";

CREATE VIEW public.expressions AS
  SELECT
    e."id" AS "id",
    e."enabled" AS "enabled",

    e."data" AS "data",
    e."author" AS "author"
  FROM private.expressions AS e
  WHERE
    e."deleted" IS NULL
    AND
    e."enabled";

GRANT SELECT ON public.expressions TO "api-public";
