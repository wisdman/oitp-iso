SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_equation__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _uniqueItems smallint;

  _minQuantity smallint;
  _maxQuantity smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    ("complexity"->'uniqueItems')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint
  INTO
    _playTimeLimit,
    _minItems,
    _maxItems,
    _uniqueItems,
    _minQuantity,
    _maxQuantity
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'math-equation';

  _quantity := public.random_in_range(_minQuantity, _maxQuantity);

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
