SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_sequence__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _complexity smallint;

  _minQuantity smallint;
  _maxQuantity smallint;
  _quantity smallint;

  _length int := 8;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint
  INTO
    _playTimeLimit,
    _complexity,
    _minQuantity,
    _maxQuantity
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'math-sequence';

  _quantity := public.random_in_range(_minQuantity, _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-sequence',
        'ui', 'math-sequence',
        'timeLimit', _playTimeLimit,
        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_sequence__complexity_0(_length) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 0
      UNION ALL
      SELECT private.trainer__math_sequence__complexity_1(_length) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 1
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
