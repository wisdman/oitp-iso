CREATE OR REPLACE FUNCTION trainer.classification_colors_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'classification-colors';
  _trainerUI public.trainer_ui := 'classification-colors';

  _minItems smallint := 3;
  _maxItems smallint := 9;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', jsonb_agg(to_jsonb(t))
      )
    FROM (
      SELECT "title", "color"
      FROM ONLY trainer.classification_colors_data
      WHERE "enabled"
      ORDER BY random()
      LIMIT _maxItems
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
