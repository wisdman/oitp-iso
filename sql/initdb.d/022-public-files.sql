SET search_path = "$user";

CREATE VIEW public.files AS
  SELECT
    f."id",
    f."mime",
    f."title",
    f."description"
  FROM private.files AS f
  WHERE
    f."deleted" IS NULL
    AND
    f."enabled";

GRANT SELECT ON public.files TO "api-public";
