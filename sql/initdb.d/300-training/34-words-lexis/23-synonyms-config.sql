CREATE OR REPLACE FUNCTION trainer.words_lexis_synonyms_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'words-lexis-synonyms';
  _trainerUI public.trainer_ui := 'words-lexis';

  _minQuantity smallint := 1;
  _maxQuantity smallint := 3;

  _minItems smallint := 4;
  _maxItems smallint := 10;

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

        'items', array_agg("item")
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER() - 1) % _maxQuantity AS "grp",
        "item"
      FROM (
        SELECT ARRAY["wordA", "wordB"] AS "item"
        FROM ONLY trainer.words_lexis_synonyms_data
        WHERE enabled
        ORDER BY random()
        LIMIT _maxQuantity * _maxItems
      ) AS t
    ) AS t
    GROUP BY "grp"
  );
END $$ LANGUAGE plpgsql VOLATILE;
