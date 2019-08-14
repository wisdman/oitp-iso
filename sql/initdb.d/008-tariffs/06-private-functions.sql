SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.get_default_tariff(OUT _id uuid) AS $$
BEGIN
  SELECT "id" INTO STRICT _id
  FROM ONLY private.tariffs AS t
  WHERE "archive" IS NULL
    AND "enabled"
    AND "default"
    AND "issue" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now());
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION private.get_tariff_by_code(_code varchar(32), OUT _id uuid) AS $$
BEGIN
  SELECT t."id" INTO STRICT _id
  FROM private.tariffs_codes AS c
  LEFT JOIN private.tariffs AS t ON (t."id" = c."tariff")
  WHERE t."archive" IS NULL
    AND t."enabled"
    AND t."issue" <= timezone('UTC', now())
    AND t."expires" > timezone('UTC', now())
    AND c."enabled"
    AND c."issue" <= timezone('UTC', now())
    AND c."expires" > timezone('UTC', now());
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;
