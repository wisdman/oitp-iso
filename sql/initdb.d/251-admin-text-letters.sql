SET search_path = "$user";

CREATE VIEW admin.trainer_text_letters AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_text_letters AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_text_letters TO "api-admin";
