SET search_path = "$user";

-- SELECT * FROM private.trainer__math_sequence__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_sequence__config() RETURNS SETOF RECORD AS $$
DECLARE
  _length int := 8;

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
  WHERE "trainer" = 'math-sequence';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'math-sequence',
        'ui', 'math-sequence',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', "items"
      )
    FROM (
      SELECT private.trainer__math_sequence__complexity_1(_length) AS "items"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT private.trainer__math_sequence__complexity_2(_length) AS "items"
      FROM generate_series(1,random()::int + 2) AS s WHERE _complexity >= 2
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
