SET search_path = "$user";

CREATE VIEW admin.trainer_words_groups AS
  SELECT
    t."id",
    t."enabled",

    t."group",
    t."words"
  FROM private.trainer_words_groups AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_words_groups TO "api-admin";
