SET search_path = "$user";

-- DROP VIEW  private.allowed_files CASCADE;
CREATE VIEW private.allowed_files AS
  SELECT
    "id",
    "public",

    "mime",
    "name",
    "alt"
  FROM private.files
  WHERE "deleted" IS NULL
    AND "enabled";

-- DROP VIEW public.files CASCADE;
CREATE VIEW public.files AS
  SELECT "id", to_jsonb(t) - 'public' AS "file"
  FROM private.allowed_files AS t
  WHERE "public";

GRANT SELECT ON public.files TO "api-public";
