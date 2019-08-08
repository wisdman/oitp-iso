SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.matrix_sequence_random_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'matrix-sequence-random';
  _trainerUI public.trainer_ui := 'matrix-sequence-play';

  _matrixSize smallint := 25;

  _showSuccess boolean := TRUE;
  _useColors boolean := FALSE;

  _minQuantity smallint := 3;
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
    SELECT
      jsonb_build_object(
        'id', 'matrix-sequence-random',
        'ui', 'matrix-sequence-play',

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'matrix', "matrix",

        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM (
      SELECT (SELECT array_agg(v ORDER BY random()) FROM generate_series(1, _matrixSize) AS v WHERE s = s) AS "matrix"
      FROM generate_series(1, _maxQuantity) AS s
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
