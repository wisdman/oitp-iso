SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.image_differences_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'image-differences';
  _trainerUI public.trainer_ui := 'image-differences';

  _minQuantity smallint := 2;
  _maxQuantity smallint := 10;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT WHERE FALSE
  );
END $$ LANGUAGE plpgsql VOLATILE;
