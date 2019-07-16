SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_equation__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _uniqueItems smallint;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    ("complexity"->'uniqueItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _minItems,
    _maxItems,
    _uniqueItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'math-equation';

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
