SET search_path = "$user";

CREATE VIEW admin.users AS
  SELECT
    u."id",
    u."enabled",
    u."roles",

    u."email",
    u,"emailIsValid",

    u."phone",
    u."phoneIsValid",

    NULL AS "password",
    u."certificate",
    u."oauth",

    u."name",
    u."surname",
    u."avatar",

    u."profile",
    u."tariff",
    u."timezone",

    to_char(u."registrationTS", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "registrationTS",

    array_agg(
      json_build_object(
          'fingerprint', s."fingerprint",
          'ip', s."ip",
          'ts', s."ts",
          'expires', s."expires"
      )
    ) AS "sessions"
  FROM private.users AS u
  LEFT JOIN private.sessions AS s ON (s."owner" = u."id")
  WHERE u."deleted" IS NOT NULL
  GROUP BY u."id";

GRANT SELECT ON admin.users TO "api-admin";
