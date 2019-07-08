SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.icons_get(_quantity int) RETURNS SETOF RECORD AS $$
BEGIN
  CREATE TEMPORARY TABLE IF NOT EXISTS tmp_icons_data ON COMMIT DROP AS
    SELECT "icon" FROM (
      SELECT generate_series(("value"->'min')::int, ("value"->'max')::int) AS "icon"
      FROM private.config
      WHERE "key" = 'iconsSeries'
    ) AS i
    ORDER BY random();

  RETURN QUERY (
    WITH icons AS (
      DELETE FROM tmp_icons_data WHERE "icon" IN (
        SELECT "icon" FROM tmp_icons_data LIMIT _quantity
      ) RETURNING "icon"
    ) SELECT * FROM icons
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
