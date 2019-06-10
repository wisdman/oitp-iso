-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW public.trainer_image_expressions AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_image_expressions AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_image_expressions TO "api-public";
