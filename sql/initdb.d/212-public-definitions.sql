-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW public.trainer_definitions AS
  SELECT
    t."id",
    t."enabled",

    t."word",
    t."definitions"
  FROM private.trainer_definitions AS t
  WHERE
    t."deleted" IS NOT NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_definitions TO "api-public";
