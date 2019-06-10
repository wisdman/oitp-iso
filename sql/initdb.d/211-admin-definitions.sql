-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_definitions AS
  SELECT
    t."id",
    t."enabled",

    t."word",
    t."definitions"
  FROM private.trainer_definitions AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_definitions TO "api-admin";
