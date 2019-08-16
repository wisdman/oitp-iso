CREATE OR REPLACE FUNCTION trainer.get_colors(_quantity int) RETURNS SETOF varchar(7) AS $$
DECLARE
  colors varchar(7)[] := ARRAY['#0000ff','#00ccff','#33cc33','#663300','#996633','#cccccc','#ff0000','#ff00ff','#ffff00'];
BEGIN
  RETURN QUERY
    SELECT "color" FROM unnest(colors) AS "color"
    FULL JOIN generate_series(0, _quantity / array_length(colors,1)) AS s ON TRUE
    ORDER BY random()
    LIMIT _quantity;
END $$ LANGUAGE plpgsql VOLATILE;
