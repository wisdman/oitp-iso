-- Updated 09.06.2019
SET search_path = "$user";

CREATE VIEW admin.trainer_patterns AS
  SELECT
    t."id",
    t."enabled",

    t."type",
    t."data"
  FROM private.trainer_patterns AS t
  WHERE t."deleted" IS NOT NULL;

GRANT SELECT ON  admin.trainer_patterns TO "api-admin";
