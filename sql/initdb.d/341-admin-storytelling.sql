SET search_path = "$user";

CREATE VIEW admin.trainer_storytelling AS
  SELECT
    t."id",
    t."enabled",

    t."questions"
  FROM private.trainer_storytelling AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_storytelling TO "api-admin";
