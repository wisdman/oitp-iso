SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.image_expressions_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'image-expressions';
  _trainerPreviewUI public.trainer_ui := 'image-expressions-preview';
  _trainerPlayUI public.trainer_ui := 'image-differences';

  _minQuantity smallint := 2;
  _maxQuantity smallint := 20;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    WITH cte_data AS (
      SELECT
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPreviewUI,

          'previewTimeLimit', _previewTimeLimit,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'image', "id",
          'data', "data"
        ) AS "preview",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPlayUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity,

          'image', "id",
          'data', "data"
        ) AS "config"
      FROM (
        SELECT "id", "data"
        FROM ONLY trainer.image_expressions_data
        WHERE "enabled"
        ORDER BY random()
        LIMIT _maxQuantity
      ) AS t
    )
    SELECT "config"
    FROM (
      SELECT 1 AS "ord", "config" FROM (SELECT "preview" AS "config" FROM cte_data ORDER BY random()) AS t1
      UNION ALL
      SELECT 2 AS "ord", "config" FROM (SELECT "config" AS "config" FROM cte_data ORDER BY random()) AS t2
      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
