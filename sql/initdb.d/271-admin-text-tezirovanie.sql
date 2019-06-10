-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_text_tezirovanie AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_text_tezirovanie AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_text_tezirovanie TO "api-admin";
