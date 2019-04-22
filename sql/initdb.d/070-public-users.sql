SET search_path = "$user";

CREATE VIEW public.users AS
  SELECT
    u."id" as "id",
    u."enabled" as "enabled",
    u."roles" as "roles",

    u."email" as "email",
    u."phone" as "phone",

    u."name" as "name",
    u."image" as "image",

    u."regTS" as "regTS",
    array_agg(s."id") as "sessions"
  FROM private.users u
  JOIN private.sessions s ON (s."user" = u."id")
  WHERE NOT u."deleted"
  GROUP BY u."id";

CREATE RULE users__prevent_insers AS ON INSERT TO public.users
DO INSTEAD NOTHING;

CREATE RULE users__delete AS ON DELETE TO public.users
DO INSTEAD
  UPDATE private.users SET "deleted" = TRUE WHERE "id" = OLD."id"
  RETURNING OLD.*;

GRANT SELECT ON public.users TO api;
