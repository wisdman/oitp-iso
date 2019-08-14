-- DROP VIEW public.files CASCADE;
CREATE VIEW public.files AS
  SELECT "id", to_jsonb(t) - 'enabled' - 'public' AS "file"
  FROM ONLY private.files AS t
  WHERE "enabled" AND "public";

GRANT SELECT ON public.files TO "api-public";
