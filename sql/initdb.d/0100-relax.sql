SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.relax_get(_quantity int) RETURNS SETOF RECORD AS $$
DECLARE
  _relaxSeriesMin int := 0;
  _relaxSeriesMax int := 45;
BEGIN
  CREATE TEMPORARY TABLE IF NOT EXISTS tmp_relax_data ON COMMIT DROP AS
    SELECT "id" FROM generate_series(_relaxSeriesMin, _relaxSeriesMax) AS "id"
    ORDER BY random();

  RETURN QUERY (
    WITH relax AS (
      DELETE FROM tmp_relax_data WHERE "id" IN (
        SELECT "id" FROM tmp_relax_data LIMIT _quantity
      ) RETURNING "id"
    ) SELECT * FROM relax
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
