CREATE OR REPLACE FUNCTION self.new_training(_type public.training_type, OUT _config jsonb) AS $$
DECLARE
  _timeLimit smallint;
  _trainers jsonb;
BEGIN
  SELECT "timeLimit", "trainers" INTO _timeLimit, _trainers
  FROM ONLY private.training_configs
  WHERE "enabled" AND "type" = _type
  ORDER BY random() LIMIT 1;

  INSERT INTO private.users_trainings("owner", "type", "timeLimit", "configs")
  SELECT current_setting('app.sessionUser')::uuid, _type, _timeLimit, jsonb_agg("config")
  FROM (
    SELECT "config" || jsonb_build_object('idx', ROW_NUMBER() OVER()) AS "config"
    FROM (
      SELECT private.trainer_config("trainer"::public.trainer_type) AS "config"
      FROM (
        SELECT
          ROW_NUMBER() OVER() AS "grp",
          jsonb_array_elements_text("value") AS "trainer"
        FROM jsonb_array_elements(_trainers)
      ) AS _
      ORDER BY "grp", random()
    ) AS _
  ) AS _
  RETURNING jsonb_build_object(
    'id', "id",
    'type', "type",
    'timeLimit', "timeLimit",
    'trainers', "configs"
  ) INTO STRICT _config;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.finish_training(_training uuid, _results jsonb, OUT _result jsonb) AS $$
BEGIN
  UPDATE private.users_trainings SET
    "finish" = timezone('UTC', now()),
    "results" = _results
  WHERE "id" = _training
    AND "owner" = current_setting('app.sessionUser')::uuid
  RETURNING jsonb_build_object('result', "progress"->'result') INTO STRICT _result;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
