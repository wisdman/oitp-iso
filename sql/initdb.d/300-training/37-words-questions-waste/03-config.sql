CREATE OR REPLACE FUNCTION trainer.words_questions_waste_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'words-questions-waste';
  _trainerUI public.trainer_ui := 'words-questions-waste';

  _minQuantity smallint := 3;
  _maxQuantity smallint := 6;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', (SELECT array_agg(v ORDER BY random()) FROM unnest("items") AS v)
      )
    FROM (
      SELECT "items"
      FROM ONLY trainer.words_questions_waste_data
      WHERE enabled
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS _
  );
END $$ LANGUAGE plpgsql VOLATILE;
