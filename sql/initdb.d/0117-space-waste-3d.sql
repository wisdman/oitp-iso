SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__space_waste_3d__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'space-waste-3d';
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
