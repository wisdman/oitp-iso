SET search_path = "$user";

-- SELECT * FROM private.trainer__space_waste_3d__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__space_waste_3d__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minItems smallint := 3;
  _maxItems smallint := 15;
  _itemsCount smallint;

  _minQuantity smallint := 2;
  _maxQuantity smallint := 5;
  _quantity smallint;

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
  WHERE "trainer" = 'space-waste-3d';

  RETURN QUERY (
    SELECT WHERE FALSE
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;