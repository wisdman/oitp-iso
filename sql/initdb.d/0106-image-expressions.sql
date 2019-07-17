SET search_path = "$user";

CREATE TABLE private.trainer__image_expressions__data (
  "id" integer NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__image_expressions__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__image_expressions__data__check__data CHECK (char_length("data") >= 0)
) WITH (OIDS = FALSE);

-- SELECT * FROM private.trainer__image_expressions__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__image_expressions__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 2;
  _maxQuantity smallint := 20;
  _quantity smallint;

  _previewTimeLimit smallint;
  _timeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "timeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _timeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'image-expressions';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    WITH d AS (
      SELECT
        jsonb_build_object(
          'id', 'image-expressions',
          'ui', 'image-expressions-preview',

          'timeLimit', _previewTimeLimit,
          'complexity', _complexity,

          'image', "id",
          'data', "data"
        ) AS "preview",
        jsonb_build_object(
          'id', 'image-expressions',
          'ui', 'image-expressions',

          'timeLimit', _timeLimit,
          'complexity', _complexity,

          'image', "id",
          'data', "data"
        ) AS "config"
      FROM private.trainer__image_expressions__data
      ORDER BY random()
      LIMIT _quantity
    )
    SELECT "config"
    FROM (
      SELECT 1 AS "ord", "config" FROM (SELECT "preview" AS "config" FROM d ORDER BY random()) AS t1
      UNION ALL
      SELECT 2 AS "ord", "config" FROM (SELECT "config" AS "config" FROM d ORDER BY random()) AS t2
      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
