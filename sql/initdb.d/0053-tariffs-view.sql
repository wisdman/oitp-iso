SET search_path = "$user";

-- DROP VIEW  private.allowed_tariffs CASCADE;
CREATE VIEW private.allowed_tariffs AS
  SELECT
    "id",
    "default",
    "public",

    "title",
    "description",
    "amount",
    "interval"
  FROM private.tariffs
  WHERE "archive" IS NULL
    AND "deleted" IS NULL
    AND "enabled"
    AND "issue" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now());

-- DROP VIEW public.tariffs CASCADE;
CREATE VIEW public.tariffs AS
  SELECT "id", to_jsonb(t) - 'public' AS "tariff"
  FROM private.allowed_tariffs AS t
  WHERE "public";

GRANT SELECT ON public.tariffs TO "api-public";
