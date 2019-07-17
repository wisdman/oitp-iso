SET search_path = "$user";

-- SELECT * FROM private.trainer__image_fields__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__image_fields__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;
  _quantity smallint;

  _minItems smallint := 3;
  _maxItems smallint := 5;

  _maxAnswersCount smallint := 25;
  _rowAnswersCount smallint := 5;
  _answersCount smallint;

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
  WHERE "trainer" = 'image-fields';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _answersCount := LEAST((_maxItems * _complexity / _rowAnswersCount + 1) * _rowAnswersCount, _maxAnswersCount);

  RETURN QUERY (
    WITH
      previews AS (
        SELECT (array_agg("icon"))[1:(floor(random()*(_maxItems-_minItems + 1)) + _minItems)] AS "items"
        FROM (
          SELECT (ROW_NUMBER() OVER() - 1) % _quantity AS "grp", "icon"
          FROM private.icons_get(_quantity * _maxItems) AS t("icon" int)
        ) AS i
        GROUP BY "grp"
      ),

      questions AS (
        SELECT "item"
        FROM (
          SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
          FROM (SELECT unnest("items") AS "icon" FROM previews) AS i1

          UNION ALL

          SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
          FROM private.icons_get(_answersCount) AS i2("icon" int)
        ) AS i
        ORDER BY random()
        LIMIT _answersCount
      )

    SELECT "config"
    FROM (
      SELECT
        1 AS "ord",
        jsonb_build_object(
          'id', 'image-fields',
          'ui', 'image-fields-preview',

          'timeLimit', _previewTimeLimit,
          'complexity', _complexity,

          'items', "items"
        ) AS "config"
      FROM previews

      UNION ALL

      SELECT
        2 AS "ord",
        jsonb_build_object(
          'id', 'image-fields',
          'ui', 'image-fields-question',

          'timeLimit', _timeLimit * _answersCount,
          'complexity', _complexity,

          'items', array_agg("item")
        ) AS "config"
      FROM questions

      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
