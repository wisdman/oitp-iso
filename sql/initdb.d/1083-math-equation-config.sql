SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.math_equation_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'math-equation';
  _trainerUI public.trainer_ui := 'math-equation';

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;

  _minItems smallint := 3;
  _maxItems smallint := 5;

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
    SELECT WHERE FALSE
  );

END $$ LANGUAGE plpgsql VOLATILE;
