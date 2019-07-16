SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__matrix_sequence_random__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _matrixSize smallint;

  _showSuccess bool;
  _useColors bool;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'matrixSize')::smallint,
    ("complexity"->'showSuccess')::bool,
    ("complexity"->'useColors')::bool,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _matrixSize,
    _showSuccess,
    _useColors,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'matrix-sequence-random';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'matrix-sequence-random',
        'ui', 'matrix-sequence-play',
        'timeLimit', _playTimeLimit,
        'matrix', "data",
        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM (
      SELECT (
        SELECT array_agg(v ORDER BY random())
        FROM generate_series(1, _matrixSize) AS v
        WHERE s = s
      ) AS "data"
      FROM generate_series(1, _quantity) AS s
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
