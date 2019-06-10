-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_text_reading AS
  SELECT
    t."id",
    t."enabled",

    t."data",
    t."author",
    t."questions"
  FROM private.trainer_text_reading AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_text_reading TO "api-admin";
