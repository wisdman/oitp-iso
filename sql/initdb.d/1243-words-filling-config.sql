SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.words_filling_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'words-filling';
  _trainerUI public.trainer_ui := 'words-filling';

  runes char[] := '{А,Б,В,Г,Д,Е,Ж,З,И,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Э,Ю,Я}'::char[];

  _minQuantity smallint := 1;
  _maxQuantity smallint := 3;

  _minItems smallint := 10;
  _maxItems smallint := 100;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'runes', array_agg("rune")
      )
    FROM (
      SELECT "rune"
      FROM unnest(runes) AS "rune"
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS t FULL JOIN generate_series(1, _maxItems) ON TRUE
    GROUP BY "rune"
  );
END $$ LANGUAGE plpgsql VOLATILE;
