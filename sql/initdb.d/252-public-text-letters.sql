-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW public.trainer_text_letters AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_text_letters AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_text_letters TO "api-public";