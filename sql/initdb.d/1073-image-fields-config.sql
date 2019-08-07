SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.image_fields_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'image-fields';
  _trainerPreviewUI public.trainer_ui := 'image-fields-preview';
  _trainerQuestionUI public.trainer_ui := 'image-fields-question';

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;

  _minItems smallint := 3;
  _maxItems smallint := 5;

  _rowAnswersCount smallint := 5;
  _maxAnswersCount smallint := 25;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  _maxAnswersCount := LEAST((_maxItems * _complexity / _rowAnswersCount + 1) * _rowAnswersCount, _maxAnswersCount);

  RETURN QUERY (
    WITH previews AS (
      SELECT (array_agg("icon"))[1:public.random(_minItems, _maxItems)] AS "items"
      FROM (
        SELECT (ROW_NUMBER() OVER() - 1) % _maxQuantity AS "grp", "icon"
        FROM trainer.get_icons(_maxQuantity * _maxItems) AS "icon"
      ) AS i
      GROUP BY "grp"
    ), questions AS (
      SELECT "item"
      FROM (
        SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
        FROM (SELECT unnest("items") AS "icon" FROM previews) AS i

        UNION ALL

        SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
        FROM trainer.get_icons(_maxAnswersCount) AS "icon"
      ) AS i
      ORDER BY random()
      LIMIT _maxAnswersCount
    )

    SELECT "config"
    FROM (
      SELECT
        1 AS "ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPreviewUI,

          'previewTimeLimit', _previewTimeLimit,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'items', "items"
        ) AS "config"
      FROM previews

      UNION ALL

      SELECT
        2 AS "ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerQuestionUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity,

          'items', array_agg("item")
        ) AS "config"
      FROM questions

      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
