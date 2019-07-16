SET search_path = "$user";

CREATE TABLE private.trainer__classification_definitions__data (
  "word" text NOT NULL,
  "definitions" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_definitions__data__idx__pkey PRIMARY KEY ("word"),
  CONSTRAINT trainer__classification_definitions__data__check__definitions CHECK (array_length("definitions", 1) > 0)
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__classification_definitions__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;
  _minItems smallint;
  _maxItems smallint;
  _quantity int;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'classification-definitions';

  RETURN QUERY (
    SELECT (
      SELECT
        jsonb_build_object(
          'id', 'classification-definitions',
          'ui', 'classification-definitions',
          'timeLimit', _playTimeLimit,
          'items', "items"
        )
      FROM (
        SELECT
          jsonb_agg(
            jsonb_build_object(
              'data', "data",
              'definition', "definition"
            )
          ) AS "items"
        FROM (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY "data" ORDER BY random()) AS cnt
          FROM (
            SELECT
              "word" AS "data",
              unnest("definitions") AS "definition"
            FROM (
              SELECT "definitions", "word"
              FROM private.trainer__classification_definitions__data
              ORDER BY random()
              LIMIT public.random(_minItems, _maxItems)
            ) AS t
            ORDER BY random()
          ) AS t
        ) AS t WHERE cnt = 1
      ) AS t
      WHERE s = s
    ) AS "config"
    FROM generate_series(1,_quantity) AS s
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
