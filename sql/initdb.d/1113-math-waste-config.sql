SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.math_waste_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'math-waste';
  _trainerUI public.trainer_ui := 'math-waste';

  _minItems smallint := 5;
  _maxItems smallint := 20;

  _maxQuantity smallint := 3;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxItems := LEAST((_complexity / _minItems + 1) * _minItems, _maxItems);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity

      ) || "config"
    FROM (
      SELECT trainer.math_waste_complexity_1(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 1
      UNION ALL
      SELECT trainer.math_waste_complexity_2(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 2
      UNION ALL
      SELECT trainer.math_waste_complexity_3(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 3
      UNION ALL
      SELECT trainer.math_waste_complexity_4(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 4
      UNION ALL
      SELECT trainer.math_waste_complexity_5(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 5
      UNION ALL
      SELECT trainer.math_waste_complexity_6(_maxItems) AS "config"
      FROM generate_series(1, _maxQuantity - random()::int) AS s WHERE _complexity >= 6
    ) AS t
    ORDER BY random()
  );

END $$ LANGUAGE plpgsql VOLATILE;
