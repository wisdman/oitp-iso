SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.matrix_filling_pattern_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'matrix-filling-pattern';
  _trainerPreviewUI public.trainer_ui := 'matrix-images-preview';
  _trainerPlayUI public.trainer_ui := 'matrix-images-filling';

  _trainerQuestion public.trainer_type := 'matrix-filling-question';
  _trainerQuestionUI public.trainer_ui := 'matrix-images-question';

  _matrixSizes smallint[];
  _matrixSize smallint;

  _maxItems smallint;
  _itemsCount smallint;

  _maxAnswers smallint := 25;
  _maxAnswersPerRow smallint := 5;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 7;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;

  _questionPreviewTimeLimit int;
  _questionPlayTimeLimit int;
  _questionComplexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _questionPreviewTimeLimit, _questionPlayTimeLimit, _questionComplexity
  FROM private.get_complexity(_trainerQuestion, current_setting('app.sessionUser', true)::uuid);

  SELECT array_agg(DISTINCT "size" ORDER BY "size")
  INTO STRICT _matrixSizes
  FROM ONLY trainer.matrix_filling_pattern_data
  WHERE enabled;

  SELECT MAX("items")
  INTO STRICT _maxItems
  FROM ONLY trainer.matrix_filling_pattern_data
  WHERE enabled;

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];

  _itemsCount := GREATEST(sqrt(_matrixSize)::smallint, _maxAnswersPerRow);
  _itemsCount := (_maxItems * 2 / _itemsCount + 1) * _itemsCount;

  _maxQuantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);
  _maxAnswers := LEAST((_maxItems * _questionComplexity / _maxAnswersPerRow + 1) * _maxAnswersPerRow, _maxAnswers);

  RETURN QUERY (
    WITH patterns AS (
      SELECT
        "data",
        (SELECT array_agg(i) FROM trainer.get_icons("items") AS i) AS "correct",
        (SELECT array_agg(i) FROM trainer.get_icons(_itemsCount - "items") AS i) AS "incorrect"
      FROM (
        SELECT "data", "items"
        FROM ONLY trainer.matrix_filling_pattern_data
        WHERE "size" = _matrixSize
          AND enabled
        ORDER BY random()
        LIMIT _maxQuantity
      ) AS t
    ), configs AS (
      SELECT
        (ROW_NUMBER() OVER()) * 2 AS "preview-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPreviewUI,

          'previewTimeLimit', _previewTimeLimit,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'items', "correct",
          'matrix', "data"
        ) AS "preview",
        (ROW_NUMBER() OVER()) * 2 + 1 AS "config-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPlayUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity,

          'items', "correct" || "incorrect",
          'matrix', "data"
        ) AS "config"
      FROM patterns
    ), questions AS (
      SELECT
        9999 AS "question-ord",
        jsonb_build_object(
          'id', _trainerQuestion,
          'ui', _trainerQuestionUI,

          'previewTimeLimit', _questionPreviewTimeLimit,
          'playTimeLimit', _questionPlayTimeLimit,
          'complexity', _questionComplexity,

          'items', array_agg("item")
        ) AS "question"
      FROM (
        SELECT "item"
        FROM (
          SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
          FROM (SELECT unnest("correct") AS "icon" FROM patterns) AS i1
          UNION ALL
          SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
          FROM trainer.get_icons(_maxAnswers) AS "icon"
        ) AS t
        ORDER BY random()
        LIMIT _maxAnswers
      ) AS t
    )
    SELECT "config"
    FROM (
      SELECT "preview-ord" AS "ord", "preview" AS "config" FROM configs
      UNION ALL
      SELECT "config-ord" AS "ord", "config" AS "config" FROM configs
      UNION ALL
      SELECT "question-ord" AS "ord", "question" AS "config" FROM questions
      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
