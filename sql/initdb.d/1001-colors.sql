SET search_path = "$user";

-- DROP TABLE trainer.colors CASCADE;
CREATE TABLE trainer.colors (
  "color" varchar(7) DEFAULT NULL CHECK (public.check_color("color")),

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT colors__pkey PRIMARY KEY ("color"),
  CONSTRAINT colors__check__color CHECK (public.check_color("color"))
);

INSERT INTO trainer.colors("color") VALUES
  ('#0000ff'), ('#00ccff'), ('#33cc33'), ('#663300'), ('#996633'), ('#cccccc'), ('#ff0000'),
  ('#ff00ff'), ('#ffff00');

CREATE OR REPLACE FUNCTION trainer.get_colors(_quantity int) RETURNS SETOF varchar(7) AS $$
BEGIN
  RETURN QUERY
    SELECT "color" FROM trainer.colors
    FULL JOIN generate_series(0, _quantity / (SELECT COUNT("color") FROM trainer.colors)) AS s ON TRUE
    WHERE "deleted" IS NULL
      AND "enabled"
    ORDER BY random()
    LIMIT _quantity;
END $$ LANGUAGE plpgsql VOLATILE;
