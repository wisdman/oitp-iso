-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW public.trainer_words_close AS
  SELECT
    t."id",
    t."enabled",

    t."word",
    t."items"
  FROM private.trainer_words_close AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_close TO "api-public";