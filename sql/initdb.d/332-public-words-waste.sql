SET search_path = "$user";

CREATE VIEW public.trainer_words_waste AS
  SELECT
    t."id",
    t."enabled",

    t."items"
  FROM private.trainer_words_waste AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_waste TO "api-public";
