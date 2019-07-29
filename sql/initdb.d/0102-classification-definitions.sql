SET search_path = "$user";

CREATE TABLE private.trainer__classification_definitions__data (
  "word" text NOT NULL,
  "definitions" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_definitions__data__idx__pkey PRIMARY KEY ("word"),
  CONSTRAINT trainer__classification_definitions__data__check__definitions CHECK (array_length("definitions", 1) > 0)
);

-- SELECT * FROM private.trainer__classification_definitions__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__classification_definitions__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 3;
  _maxItems smallint := 12;
  _itemsCount smallint;

  _previewTimeLimit smallint;
  _playTimeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "playTimeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _playTimeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'classification-definitions';

  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'classification-definitions',
        'ui', 'classification-definitions',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit * _itemsCount,
        'complexity', _complexity,

        'items', jsonb_agg(jsonb_build_object(
          'data', "word",
          'definition', (SELECT array_agg(v ORDER BY random()) FROM unnest("definitions") v)[1]
        ))
      )
    FROM (
      SELECT "word", "definitions"
      FROM private.trainer__classification_definitions__data
      ORDER BY random()
      LIMIT _itemsCount
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
