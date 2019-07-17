SET search_path = "$user";

-- SELECT * FROM private.trainer__math_sequence__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_sequence__config() RETURNS SETOF RECORD AS $$
DECLARE
  _length int := 8;

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
  WHERE "trainer" = 'math-sequence';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-sequence',
        'ui', 'math-sequence',

        'timeLimit', _timeLimit,
        'complexity', _complexity,

        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_sequence__complexity_1(_length) AS "items"
      FROM generate_series(0,random()::int) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_sequence__complexity_2(_length) AS "items"
      FROM generate_series(0,random()::int) AS s WHERE _complexity >= 2
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
