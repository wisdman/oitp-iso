SET search_path = "$user";

CREATE TABLE private.trainer__classification_colors__data (
  "color" varchar(7) DEFAULT NULL,
  "data"  text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_colors__data__idx__pkey PRIMARY KEY ("color"),
  CONSTRAINT trainer__classification_colors__data__check__color CHECK ("color" ~ '^#[0-9a-f]{6}$')
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__classification_colors__config() RETURNS SETOF RECORD AS $$
DECLARE
  _itemTimeLimit smallint;
  _minItems smallint;
  _maxItems smallint;
  _quantity int;
BEGIN
  SELECT
    ("complexity"->'itemTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _itemTimeLimit,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'classification-colors';

  RETURN QUERY (
    SELECT (
      SELECT
        jsonb_build_object(
          'id', 'classification-colors',
          'ui', 'classification-colors',
          'timeLimit', jsonb_array_length("items") * _itemTimeLimit,
          'items', "items"
        )
      FROM (
        SELECT
          jsonb_agg(to_jsonb(t)) AS "items"
        FROM (
          SELECT "color", "data"
          FROM private.trainer__classification_colors__data
          ORDER BY random()
          LIMIT public.random(_minItems, _maxItems)
        ) AS t
      ) AS t
      WHERE s = s
    ) AS "config"
    FROM generate_series(1,_quantity) AS s
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
