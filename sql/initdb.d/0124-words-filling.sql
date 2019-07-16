SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__words_filling__config() RETURNS SETOF RECORD AS $$
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
  WHERE "trainer" = 'words-filling';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-filling',
        'ui', 'words-filling',
        'timeLimit', _playTimeLimit,
        'runes', "runes"
      )
    FROM (
      SELECT array_agg("rune") AS "runes", "rune" AS "grp"
      FROM (
        SELECT "rune"
        FROM unnest('{А,Б,В,Г,Д,Е,Ж,З,И,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Э,Ю,Я}'::char[]) AS "rune"
        ORDER BY random()
        LIMIT _quantity
      ) AS t FULL JOIN generate_series(1, public.random(_minItems, _maxItems)) ON TRUE
      GROUP BY "grp"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
