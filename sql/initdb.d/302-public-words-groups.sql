SET search_path = "$user";

CREATE VIEW public.trainer_words_groups AS
  SELECT
    t."id",
    t."enabled",

    t."group",
    t."words"
  FROM private.trainer_words_groups AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_groups TO "api-public";
