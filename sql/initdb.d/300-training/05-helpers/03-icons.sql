CREATE OR REPLACE FUNCTION trainer.get_icons(_quantity int) RETURNS SETOF int AS $$
DECLARE
  _iconsSeriesMin int := 0;
  _iconsSeriesMax int := 280;
BEGIN
  CREATE TEMPORARY TABLE IF NOT EXISTS tmp_icons_data ON COMMIT DROP AS
    SELECT "id" FROM generate_series(_iconsSeriesMin, _iconsSeriesMax) AS "id"
    ORDER BY random();

  RETURN QUERY (
    WITH icons AS (
      DELETE FROM tmp_icons_data WHERE "id" IN (
        SELECT "id" FROM tmp_icons_data LIMIT _quantity
      ) RETURNING "id"
    ) SELECT * FROM icons
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
