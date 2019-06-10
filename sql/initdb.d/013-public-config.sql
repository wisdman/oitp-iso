SET search_path = "$user";

CREATE VIEW public.config AS
  SELECT
    c."key",
    c."description",
    c."value"
  FROM private.config AS c
  WHERE c."deleted" IS NOT NULL;

GRANT SELECT ON public.config TO "api-public";
