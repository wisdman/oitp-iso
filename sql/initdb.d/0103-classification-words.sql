SET search_path = "$user";

CREATE TABLE private.trainer__classification_words__data (
  "group" text NOT NULL,
  "words" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_words__data__idx__pkey PRIMARY KEY ("group"),
  CONSTRAINT trainer__classification_words__data__check__words CHECK (array_length("words", 1) > 0)
);

-- SELECT * FROM private.trainer__classification_words__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__classification_words__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minGroups smallint := 2;
  _maxGroups smallint := 6;
  _groupsCount smallint;

  _minItems smallint := 3;
  _maxItems smallint := 5;
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
  WHERE "trainer" = 'classification-words';

  _groupsCount := LEAST(_minGroups + _complexity, _maxItems) - random()::smallint;
  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'classification-words',
        'ui', 'classification-words',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit * _groupsCount * _itemsCount,
        'complexity', _complexity,

        'items', jsonb_agg(jsonb_build_object(
          'group', "group",
          'words', "words"
        ))
      )
    FROM (
      SELECT
        "group",
        (SELECT array_agg(v ORDER BY random()) FROM unnest("words") v)[1:_itemsCount] AS "words"
      FROM private.trainer__classification_words__data
      ORDER BY random()
      LIMIT _groupsCount
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
