-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_relax AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_relax AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_relax TO "api-admin";
