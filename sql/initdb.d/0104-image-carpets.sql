SET search_path = "$user";

CREATE TABLE private.trainer__image_carpets__data (
  "id" integer NOT NULL,

  "complexity" smallint NOT NULL DEFAULT 0,

  "width" smallint NOT NULL,
  "height" smallint NOT NULL,
  "items" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__image_carpets__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__image_carpets__data__check__complexity CHECK ("complexity" >= 0),

  CONSTRAINT trainer__image_carpets__data__check__width CHECK ("width" > 0),
  CONSTRAINT trainer__image_carpets__data__check__height CHECK ("height" > 0),

  CONSTRAINT trainer__image_carpets__data__check__items
    CHECK (jsonb_typeof("items") = 'array' AND jsonb_array_length("items") > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__image_carpets__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__image_carpets__data.id;

ALTER TABLE ONLY private.trainer__image_carpets__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__image_carpets__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__image_carpets__config() RETURNS SETOF RECORD AS $$
DECLARE
  _previewTimeLimit smallint;
  _playTimeLimit smallint;
  _complexity smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'previewTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _previewTimeLimit,
    _playTimeLimit,
    _complexity,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'image-carpets';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'image-carpets',
        'ui', 'image-carpets',
        'previewTimeLimit', _previewTimeLimit,
        'timeLimit', _playTimeLimit,
        'width', "width",
        'height', "height",
        'carpet', "id",
        'items', (SELECT
                   jsonb_agg("group")
                 FROM (
                    SELECT
                      jsonb_build_object(
                        'color', "item"->'color',
                        'items', jsonb_agg("item"->'d')
                      ) AS "group"
                    FROM jsonb_array_elements(c."items") AS "item"
                    GROUP BY "item"->'group', "item"->'color'
                 ) AS t
                ),
        'colors', (SELECT
                     array_agg("color") AS "colors"
                   FROM private.colors_get(
                     (SELECT MAX(("item"->'color')::int) + 1 FROM jsonb_array_elements(c."items") AS "item")
                   ) AS t("color" varchar(7))
                  )
      ) AS "config"
    FROM (
      SELECT "id", "width", "height", "items"
      FROM private.trainer__image_carpets__data
      WHERE "complexity" = _complexity
      ORDER BY random()
      LIMIT _quantity
    ) AS c
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
