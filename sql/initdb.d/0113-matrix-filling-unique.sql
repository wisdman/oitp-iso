SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__matrix_filling_unique__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _matrixSize smallint;

  _minQuantity smallint;
  _maxQuantity smallint;
  _quantity smallint;

  _itemsRowLength smallint := 5;
  _itemsCount smallint;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'matrixSize')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _matrixSize,
    _minQuantity,
    _maxQuantity
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'matrix-filling-unique';

  _quantity := public.random_in_range(_minQuantity, _maxQuantity);
  _itemsCount := ceil(_matrixSize::float / _itemsRowLength)::smallint * _itemsRowLength + _itemsRowLength;

  RETURN QUERY (
    SELECT
      unnest(ARRAY[jsonb_build_object(
        'id', 'matrix-filling-unique',
        'ui', 'matrix-images-preview',
        'timeLimit', _showTimeLimit,
        'items', (SELECT array_agg(v) FROM (SELECT v FROM unnest("items") AS v LIMIT _matrixSize) AS i),
        'matrix', "matrix"
      ),
      jsonb_build_object(
        'id', 'matrix-filling-unique',
        'ui', 'matrix-images-filling',
        'timeLimit', _playTimeLimit,
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
