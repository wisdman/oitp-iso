SET search_path = "$user";

CREATE VIEW admin.trainer_words_column AS
  SELECT
    t."id",
    t."enabled",

    t."word"
  FROM private.trainer_words_column AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_words_column TO "api-admin";
