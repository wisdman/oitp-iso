SET search_path = "$user";

-- SELECT * FROM private.trainer__matrix_sequence_random__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__matrix_sequence_random__config() RETURNS SETOF RECORD AS $$
DECLARE
  _matrixSize smallint := 25;

  _showSuccess boolean := TRUE;
  _useColors boolean := FALSE;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;
  _quantity smallint;

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
  WHERE "trainer" = 'matrix-sequence-random';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'matrix-sequence-random',
        'ui', 'matrix-sequence-play',

        'timeLimit', _timeLimit,
        'complexity', _complexity,

        'matrix', "data",

        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM (
      SELECT (SELECT array_agg(v ORDER BY random()) FROM generate_series(1, _matrixSize) AS v WHERE s = s) AS "data"
      FROM generate_series(1, _quantity) AS s
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;