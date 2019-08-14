SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.text_words_column_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'words-column';
  _trainerUI public.trainer_ui := 'words-column';

  _minQuantity smallint := 2;
  _maxQuantity smallint := 6;

  _minItems smallint := 4;
  _maxItems smallint := 15;

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

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', "items"
      )
    FROM (
      SELECT (array_agg("word"))[1:_maxItems] AS "items"
      FROM (
        SELECT
          (ROW_NUMBER() OVER() - 1) % _maxQuantity AS "grp",
          "word"
        FROM (
          SELECT "word"
          FROM ONLY trainer.text_words_column_data
          WHERE enabled
          ORDER BY random()
          LIMIT _maxQuantity * _maxItems
        ) AS t
      ) AS t
      GROUP BY "grp"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
