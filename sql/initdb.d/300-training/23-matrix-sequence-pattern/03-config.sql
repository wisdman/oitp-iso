SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.matrix_sequence_pattern_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'matrix-sequence-pattern';
  _trainerUI public.trainer_ui := 'matrix-sequence-play';

  _showSuccess boolean := TRUE;
  _useColors boolean := FALSE;

  _matrixSizes smallint[];
  _matrixSize smallint;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  SELECT array_agg(DISTINCT "size" ORDER BY "size")
  INTO STRICT _matrixSizes
  FROM ONLY trainer.matrix_sequence_pattern_data
  WHERE enabled;

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];
  _maxQuantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'matrix', "data",

        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM (
      SELECT "data"
      FROM ONLY trainer.matrix_sequence_pattern_data
      WHERE "size" = _matrixSize
        AND enabled
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
