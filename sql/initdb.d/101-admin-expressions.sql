SET search_path = "$user";

CREATE VIEW admin.expressions AS
  SELECT
    e."id" AS "id",
    e."enabled" AS "enabled",

    e."data" AS "data",
    e."author" AS "author"
  FROM private.expressions AS e
  WHERE e."deleted" IS NULL;

GRANT SELECT ON admin.expressions TO "api-admin";
