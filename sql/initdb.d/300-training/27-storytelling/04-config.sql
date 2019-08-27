CREATE OR REPLACE FUNCTION trainer.storytelling_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'storytelling';
  _trainerUI public.trainer_ui := 'storytelling';
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
      SELECT "id", "questions"
      FROM ONLY trainer.storytelling_data
      WHERE NOT trainer.is_storytelling_users_completed("id")
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

          'image', (SELECT image FROM trainer.get_relax_image(1) AS image),
          'audio', "id"
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
