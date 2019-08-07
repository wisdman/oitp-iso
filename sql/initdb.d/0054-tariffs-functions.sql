SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.get_default_tariff(OUT _id uuid) AS $$
BEGIN
  SELECT "id" INTO STRICT _id
  FROM private.allowed_tariffs
  WHERE "default"
  LIMIT 1;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION private.get_tariff_by_code(_code varchar(32), OUT _id uuid) AS $$
BEGIN
  SELECT t."id" INTO STRICT _id
  FROM private.tariffs_codes AS c
  LEFT JOIN private.allowed_tariffs AS t ON (t."id" = c."tariff")
  WHERE c."enabled"
    AND c."issue" <= timezone('UTC', now())
    AND c."expires" > timezone('UTC', now())
  LIMIT 1;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;
