SET search_path = "$user";

-- SELECT * FROM private.trainer__math_waste__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_waste__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 5;
  _maxItems smallint := 20;
  _itemsCount smallint;

  _previewTimeLimit smallint;
  _playTimeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "playTimeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _playTimeLimit,
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

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity

      ) || "config"
    FROM (
      SELECT private.trainer__math_waste__complexity_1(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_waste__complexity_2(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 2
      UNION ALL
      SELECT private.trainer__math_waste__complexity_3(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 3
      UNION ALL
      SELECT private.trainer__math_waste__complexity_4(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 4
      UNION ALL
      SELECT private.trainer__math_waste__complexity_5(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 5
      UNION ALL
      SELECT private.trainer__math_waste__complexity_6(_itemsCount) AS "config"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 6
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
