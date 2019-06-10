SET search_path = "$user";

CREATE VIEW admin.files AS
  SELECT
    f."id",
    f."enabled",

    f."mime",
    f."title",
    f."description"
  FROM private.files AS f
  WHERE f."deleted" IS NOT NULL;

GRANT SELECT ON admin.files TO "api-admin";
