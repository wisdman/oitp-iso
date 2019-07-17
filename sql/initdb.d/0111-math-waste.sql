SET search_path = "$user";

-- SELECT * FROM private.trainer__math_waste__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_waste__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 5;
  _maxItems smallint := 20;
  _itemsCount smallint;

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
  WHERE "trainer" = 'math-waste';

  _itemsCount := LEAST((_complexity / _minItems + 1) * _minItems, _maxItems);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-waste',
        'ui', 'math-waste',

        'timeLimit', _timeLimit * _itemsCount,
        'complexity', _complexity
      ) || "config"
    FROM (
      SELECT private.trainer__math_waste__complexity_1(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_waste__complexity_2(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 2
      UNION ALL
      SELECT private.trainer__math_waste__complexity_3(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 3
      UNION ALL
      SELECT private.trainer__math_waste__complexity_4(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 4
      UNION ALL
      SELECT private.trainer__math_waste__complexity_5(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 5
      UNION ALL
      SELECT private.trainer__math_waste__complexity_6(_itemsCount) AS "config"
      FROM generate_series(0,random()::int) AS s WHERE TRUE _complexity >= 6
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
