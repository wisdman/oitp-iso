-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_colors AS
  SELECT
    t."id",
    t."enabled",

    t."data",
    t."color"
  FROM private.trainer_colors AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_colors TO "api-admin";
