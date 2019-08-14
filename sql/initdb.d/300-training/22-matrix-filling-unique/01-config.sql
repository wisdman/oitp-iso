CREATE OR REPLACE FUNCTION trainer.matrix_filling_unique_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'matrix-filling-unique';
  _trainerPreviewUI public.trainer_ui := 'matrix-images-preview';
  _trainerPlayUI public.trainer_ui := 'matrix-images-filling';

  _matrixSizes smallint[] := ARRAY[9,12,16];
  _matrixSize smallint;

  _maxItems smallint := 5; -- Base set max per column

  _minQuantity smallint := 3;
  _maxQuantity smallint := 7;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];

  _maxItems := GREATEST(SQRT(_matrixSize)::smallint, _maxItems);
  _maxItems := (_matrixSize / _maxItems + 2) * _maxItems;

  _maxQuantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    WITH configs AS (
      SELECT
        (ROW_NUMBER() OVER()) * 2 AS "preview-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPreviewUI,

          'previewTimeLimit', _previewTimeLimit,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'items', "items"[1:_matrixSize],
          'matrix', "matrix"
        ) AS "preview",
        (ROW_NUMBER() OVER()) * 2 + 1 AS "config-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPlayUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity,

          'items', "items",
          'matrix', "matrix"
        ) AS "config"
      FROM (
        SELECT
          array_agg("icon") AS "items",
          (SELECT array_agg(s) FROM generate_series(0, _matrixSize - 1) AS s) AS "matrix"
        FROM (
          SELECT (ROW_NUMBER() OVER() - 1) % _maxQuantity AS "N", "icon"
          FROM trainer.get_icons(_maxQuantity * _maxItems) AS "icon"
        ) AS t
        GROUP BY "N"
      ) AS t
    )
    SELECT "config"
    FROM (
      SELECT "preview-ord" AS "ord", "preview" AS "config" FROM configs
      UNION ALL
      SELECT "config-ord" AS "ord", "config" AS "config" FROM configs
      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
