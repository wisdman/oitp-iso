SET search_path = "$user";

CREATE VIEW public.trainer_patterns AS
  SELECT
    t."id",
    t."enabled",

    t."type",
    t."data"
  FROM private.trainer_patterns AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_patterns TO "api-public";
