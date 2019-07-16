SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_sequence__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _complexity smallint;

  _quantity smallint;

  _length int := 8;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _complexity,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'math-sequence';

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
