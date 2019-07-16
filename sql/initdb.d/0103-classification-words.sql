SET search_path = "$user";

CREATE TABLE private.trainer__classification_words__data (
  "group" text NOT NULL,
  "words" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_words__data__idx__pkey PRIMARY KEY ("group"),
  CONSTRAINT trainer__classification_words__data__check__words CHECK (array_length("words", 1) > 0)
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__classification_words__config() RETURNS SETOF RECORD AS $$
DECLARE
  _itemTimeLimit smallint;
  _minGroups smallint;
  _maxGroups smallint;
  _minItems smallint;
  _maxItems smallint;
  _quantity int;
BEGIN
  SELECT
    ("complexity"->'itemTimeLimit')::smallint,
    ("complexity"->'minGroups')::smallint,
    ("complexity"->'maxGroups')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _itemTimeLimit,
    _minGroups,
    _maxGroups,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'classification-words';

  RETURN QUERY (
    SELECT (
      SELECT
        jsonb_build_object(
          'id', 'classification-words',
          'ui', 'classification-words',
          'timeLimit', jsonb_array_length("items") * _itemTimeLimit,
          'items', "items"
        )
      FROM (
        SELECT
          jsonb_agg(
            jsonb_build_object(
              'data', "data",
              'word', "word"
            )
          ) AS "items"
        FROM (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY "data" ORDER BY random()) AS cnt
          FROM (
            SELECT
              "group" AS "data",
              unnest("words") AS "word"
            FROM (
              SELECT "group", "words"
              FROM private.trainer__classification_words__data
              ORDER BY random()
              LIMIT public.random(_minGroups, _maxGroups)
            ) AS t
          ) AS t
        ) AS t WHERE cnt <= public.random(_minItems, _maxItems)
      ) AS t
      WHERE s = s
    ) AS "config"
    FROM generate_series(1,_quantity) AS s
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
