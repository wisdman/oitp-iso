CREATE OR REPLACE FUNCTION trainer.get_colors(_quantity int) RETURNS SETOF varchar(7) AS $$
BEGIN
  RETURN QUERY
    SELECT "color" FROM unnest(ARRAY['#0000ff','#00ccff','#33cc33','#663300','#996633','#cccccc','#ff0000','#ff00ff','#ffff00'])
    FULL JOIN generate_series(0, _quantity / (SELECT COUNT("color") FROM trainer.colors)) AS s ON TRUE
    ORDER BY random()
    LIMIT _quantity;
END $$ LANGUAGE plpgsql VOLATILE;
