SET search_path = "$user";

CREATE VIEW admin.config AS
  SELECT
    c."key",
    c."value",
    c."description"

  FROM private.config AS c
  WHERE c."deleted" IS NOT NULL;

GRANT SELECT ON admin.config TO "api-admin";
