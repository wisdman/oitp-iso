SET search_path = "$user";

CREATE TABLE private.colors (
  "color" varchar(7) DEFAULT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT colors__idx__pkey PRIMARY KEY ("color"),
  CONSTRAINT colors__check__color CHECK ("color" ~ '^#[0-9a-f]{6}$')
);

INSERT INTO private.colors("color") VALUES
  ('#0000ff'),
  ('#00ccff'),
  ('#33cc33'),
  ('#663300'),
  ('#996633'),
  ('#cccccc'),
  ('#ff0000'),
  ('#ff00ff'),
  ('#ffff00');

CREATE OR REPLACE FUNCTION private.colors_get(_quantity int) RETURNS SETOF RECORD AS $$
BEGIN
  RETURN QUERY
    SELECT "color" FROM private.colors
    FULL JOIN generate_series(0, _quantity / (SELECT COUNT("color") FROM private.colors)) AS s ON TRUE
    ORDER BY random()
    LIMIT _quantity;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
