SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.table_pipe_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'table-pipe';
  _trainerUI public.trainer_ui := 'table-pipe';

  _matrixSizes smallint[] := ARRAY[10, 20, 30];
  _matrixSize smallint;

  _minQuantity smallint := 2;
  _maxQuantity smallint := 3;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];
  _maxQuantity := LEAST(GREATEST(_complexity, _minQuantity), _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', ARRAY[
          jsonb_build_object(
            'data', "runes"[1],
            'action', 'UP'
          ),
          jsonb_build_object(
            'data', "runes"[2],
            'action', 'DOWN'
          ),
          jsonb_build_object(
            'data', "runes"[3],
            'action', 'LEFT'
          ),
          jsonb_build_object(
            'data', "runes"[4],
            'action', 'RIGHT'
          )
        ],
        'matrix', "matrix"
      ) AS "config"
    FROM (
      SELECT
        (SELECT array_agg((random()*3)::smallint) FROM generate_series(1, _matrixSize) AS v WHERE s = s) AS "matrix",
        (SELECT (array_agg(r ORDER BY random()))[1:4] FROM unnest("runes") AS r) AS "runes"
      FROM trainer.table_pipe_data
      FULL JOIN generate_series(1, _maxQuantity) AS s ON TRUE
      WHERE deleted IS NULL
        AND enabled
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
