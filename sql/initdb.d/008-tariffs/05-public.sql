-- DROP VIEW public.tariffs CASCADE;
CREATE VIEW public.tariffs AS
  SELECT "id", to_jsonb(t) - 'archive' - 'enabled' - 'public' - 'ts' - 'expires' AS "tariff"
  FROM private.tariffs AS t
  WHERE "archive" IS NULL
    AND "enabled"
    AND "public"
    AND "ts" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now());
