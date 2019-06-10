-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW public.trainer_words_pairs AS
  SELECT
    t."id",
    t."enabled",

    t."wordA",
    t."wordB"
  FROM private.trainer_words_pairs AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_pairs TO "api-public";
