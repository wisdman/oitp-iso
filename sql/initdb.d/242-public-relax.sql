SET search_path = "$user";

CREATE VIEW public.trainer_relax AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_relax AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_relax TO "api-public";
