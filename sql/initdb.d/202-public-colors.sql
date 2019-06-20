SET search_path = "$user";

CREATE VIEW public.trainer_colors AS
  SELECT
    t."id",
    t."enabled",

    t."data",
    t."color"
  FROM private.trainer_colors AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_colors TO "api-public";
