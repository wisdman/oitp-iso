SET search_path = "$user";

CREATE TABLE private.trainer__classification_colors__data (
  "color" varchar(7) DEFAULT NULL,
  "data"  text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__classification_colors__data__idx__pkey PRIMARY KEY ("color"),
  CONSTRAINT trainer__classification_colors__data__check__color CHECK ("color" ~ '^#[0-9a-f]{6}$')
) WITH (OIDS = FALSE);

-- SELECT * FROM private.trainer__classification_colors__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__classification_colors__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 3;
  _maxItems smallint := 9;
  _itemsCount smallint;

  _timeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "timeLimit",
    "complexity"
  INTO
    _timeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'classification-colors';

  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'classification-colors',
        'ui', 'classification-colors',

        'timeLimit', _timeLimit * _itemsCount,
        'complexity', _complexity,

        'items', jsonb_agg(to_jsonb(t))
      )
    FROM (
      SELECT "color", "data"
      FROM private.trainer__classification_colors__data
      ORDER BY random()
      LIMIT _itemsCount
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
