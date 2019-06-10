-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_words_lexis AS
  SELECT
    t."id",
    t."enabled",

    t."relation",

    t."wordA",
    t."wordB"
  FROM private.trainer_words_lexis AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_words_lexis TO "api-admin";
