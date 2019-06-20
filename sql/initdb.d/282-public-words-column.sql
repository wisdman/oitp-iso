SET search_path = "$user";

CREATE VIEW public.trainer_words_column AS
  SELECT
    t."id",
    t."enabled",

    t."word"
  FROM private.trainer_words_column AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_column TO "api-public";
