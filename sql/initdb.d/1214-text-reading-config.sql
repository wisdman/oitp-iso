SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.text_reading_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'text-reading';
  _trainerUI public.trainer_ui := 'text-reading';
  _trainerQuestionUI public.trainer_ui := 'text-question-tof';

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  RETURN QUERY (
    WITH cte_data AS (
      SELECT "text", "questions", "length"
      FROM trainer.text_reading_data
      WHERE NOT trainer.is_text_reading_users_completed("id")
        AND deleted IS NULL
        AND enabled
      ORDER BY random()
      LIMIT 1
    )

    SELECT "config"
    FROM (
      SELECT
        1 AS "ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerUI,

          'previewTimeLimit', 0,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'text', "text",
          'length', "length"
        ) AS "config"
      FROM cte_data

      UNION ALL

      SELECT
        2 AS "ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerQuestionUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity

        ) || "question" AS "config"
      FROM (SELECT jsonb_array_elements("questions") AS "question" FROM cte_data) AS t

      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
