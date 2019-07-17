SET search_path = "$user";

-- SELECT * FROM private.trainer__words_filling__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__words_filling__config() RETURNS SETOF RECORD AS $$
DECLARE
  runes char[] := '{А,Б,В,Г,Д,Е,Ж,З,И,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Э,Ю,Я}'::char[];

  _minQuantity smallint := 1;
  _maxQuantity smallint := 3;
  _quantity smallint;

  _minItems smallint := 3;
  _maxItems smallint := 20;
  _itemsCount smallint;

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
  WHERE "trainer" = 'words-filling';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-filling',
        'ui', 'words-filling',

        'timeLimit', _timeLimit * _itemsCount,
        'complexity', _complexity,

        'runes', array_agg("rune")
      )
    FROM (
      SELECT "rune"
      FROM unnest(runes) AS "rune"
      ORDER BY random()
      LIMIT _quantity
    ) AS t FULL JOIN generate_series(1, _itemsCount) ON TRUE
    GROUP BY "rune"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
