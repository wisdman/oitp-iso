SET search_path = "$user";

-- SELECT * FROM private.trainer__matrix_filling_unique__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__matrix_filling_unique__config() RETURNS SETOF RECORD AS $$
DECLARE
  _matrixSizes smallint[] := ARRAY[9,12,16];
  _matrixSize smallint;
  _columns smallint;

  _rowAnswersCount smallint := 5;
  _itemsCount smallint;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 7;
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
  WHERE "trainer" = 'matrix-filling-unique';

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];

  _columns := GREATEST(SQRT(_matrixSize)::smallint, _rowAnswersCount);
  _itemsCount := (_matrixSize / _columns + 2) * _columns;

  _quantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      unnest(ARRAY[jsonb_build_object(
        'id', 'matrix-filling-unique',
        'ui', 'matrix-images-preview',

        'timeLimit', _previewTimeLimit,
        'complexity', _complexity,

        'items', "items"[1:_matrixSize],
        'matrix', "matrix"
      ),
      jsonb_build_object(
        'id', 'matrix-filling-unique',
        'ui', 'matrix-images-filling',

        'timeLimit', _timeLimit,
        'complexity', _complexity,

        'items', "items",
        'matrix', "matrix"
      )])
    FROM (
      SELECT
        array_agg("icon") AS "items",
        (SELECT array_agg(s) FROM generate_series(0, _matrixSize - 1) AS s) AS "matrix"
      FROM (
        SELECT
          (ROW_NUMBER() OVER() - 1) % _quantity AS "N",
          i AS "icon"
        FROM private.icons_get(_quantity * _itemsCount) AS t(i int)
      ) AS t
      GROUP BY "N"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
