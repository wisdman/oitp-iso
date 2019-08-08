SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.text_tezirovanie_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'text-tezirovanie';
  _trainerUI public.trainer_ui := 'text-tezirovanie';

  _minQuantity smallint := 1;
  _maxQuantity smallint := 5;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'text', "text"
      )
    FROM (
      SELECT "text"
      FROM trainer.text_tezirovanie_data
      WHERE deleted IS NULL
        AND enabled
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
