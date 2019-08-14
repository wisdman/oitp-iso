CREATE OR REPLACE FUNCTION trainer.math_middle_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'math-middle';
  _trainerUI public.trainer_ui := 'math-middle';

  _linesCount smallint := 3;
  _maxQuantity smallint := 3;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', "items"
      )
    FROM (
      SELECT trainer.math_middle_complexity_1(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT trainer.math_middle_complexity_2(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 2
      UNION ALL
      SELECT trainer.math_middle_complexity_3(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 3
      UNION ALL
      SELECT trainer.math_middle_complexity_4(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 4
      UNION ALL
      SELECT trainer.math_middle_complexity_5(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 5
      UNION ALL
      SELECT trainer.math_middle_complexity_6(_linesCount) AS "items"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 6
    ) AS t
    ORDER BY random()
  );
END $$ LANGUAGE plpgsql VOLATILE;
