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
  FROM self.complexity('space-waste-3d');

  RETURN QUERY (
    SELECT WHERE FALSE
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
