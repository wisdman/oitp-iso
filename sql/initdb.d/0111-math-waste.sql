SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_waste__config() RETURNS SETOF RECORD AS $$
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
  WHERE "trainer" = 'math-waste';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-waste',
        'ui', 'math-waste',
        'timeLimit', _playTimeLimit,
        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_waste__complexity_0(_itemsCount) AS "items"
      FROM generate_series(1,_quantity) AS s WHERE _complexity >= 0
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
