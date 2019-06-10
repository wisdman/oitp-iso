-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_words_waste AS
  SELECT
    t."id",
    t."enabled",

    t."items"
  FROM private.trainer_words_waste AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_words_waste TO "api-admin";
