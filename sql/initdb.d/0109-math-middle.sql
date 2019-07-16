SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_middle__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _complexity smallint;
  _itemsCount smallint;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    ("complexity"->'itemsCount')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _complexity,
    _itemsCount,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'math-middle';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-middle',
        'ui', 'math-middle',
        'timeLimit', _playTimeLimit,
        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_middle__complexity_0(_itemsCount) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 0
      UNION ALL
      SELECT private.trainer__math_middle__complexity_1(_itemsCount) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_middle__complexity_2(_itemsCount) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 2
      UNION ALL
      SELECT private.trainer__math_middle__complexity_3(_itemsCount) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 3
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
