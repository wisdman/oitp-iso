-- DROP VIEW public.tariffs CASCADE;
CREATE VIEW public.tariffs AS
  SELECT "id", to_jsonb(t) - 'archive' - 'enabled' - 'public' - 'issue' - 'expires' AS "tariff"
  FROM private.tariffs AS t
  WHERE "archive" IS NULL
    AND "enabled"
    AND "public"
    AND "issue" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now());

GRANT SELECT ON public.tariffs TO "api-public";
