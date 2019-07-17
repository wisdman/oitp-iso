SET search_path = "$user";

-- SELECT * FROM private.trainer__math_middle__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_middle__config() RETURNS SETOF RECORD AS $$
DECLARE
  _itemsCount int := 3;

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
  WHERE "trainer" = 'math-middle';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-middle',
        'ui', 'math-middle',

        'timeLimit', _timeLimit,
        'complexity', _complexity,

        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_middle__complexity_1(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_middle__complexity_2(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 2
      UNION ALL
      SELECT private.trainer__math_middle__complexity_3(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 3
      UNION ALL
      SELECT private.trainer__math_middle__complexity_4(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 4
      UNION ALL
      SELECT private.trainer__math_middle__complexity_5(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 5
      UNION ALL
      SELECT private.trainer__math_middle__complexity_6(_itemsCount) AS "items"
      FROM generate_series(0,random()::int + 2) AS s WHERE _complexity >= 6
    ) AS t
    ORDER BY random()
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
