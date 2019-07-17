SET search_path = "$user";

-- SELECT * FROM private.trainer__math_equation__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__math_equation__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 3;
  _maxItems smallint := 5;
  _itemsCount smallint;

  _uniqueItems smallint;

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
  WHERE "trainer" = 'math-equation';

  RETURN QUERY (
    SELECT WHERE FALSE
  );

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
