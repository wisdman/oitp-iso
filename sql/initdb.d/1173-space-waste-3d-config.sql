SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.space_waste_3d_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'space-waste-3d';
  _trainerUI public.trainer_ui := 'space-question-waste';

  _minItems smallint := 3;
  _maxItems smallint := 15;

  _minQuantity smallint := 2;
  _maxQuantity smallint := 5;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;
  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT WHERE FALSE
  );
END $$ LANGUAGE plpgsql VOLATILE;
