SET search_path = "$user";

CREATE VIEW public.trainer_storytelling AS
  SELECT
    t."id",
    t."enabled",

    t."questions"
  FROM private.trainer_storytelling AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_storytelling TO "api-public";
