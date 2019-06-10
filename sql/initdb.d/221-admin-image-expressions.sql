-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_image_expressions AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_image_expressions AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_image_expressions TO "api-admin";
