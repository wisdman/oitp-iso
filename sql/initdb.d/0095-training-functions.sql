SET search_path = "$user";

CREATE OR REPLACE FUNCTION public.training__new(IN _type public.training__type) RETURNS jsonb AS $$
DECLARE
  _timeLimit smallint;
  _trainers jsonb;

  _trainingId uuid;
BEGIN
  SELECT
    "timeLimit",
    "trainers"
  INTO
    _timeLimit,
    _trainers
  FROM private.training_configs
  WHERE "deleted" IS NULL AND "enabled" AND "type" = _type
  ORDER BY random()
  LIMIT 1;

  INSERT INTO private.training(
    "owner",
    "type",
    "timeLimit"
  ) VALUES (
    current_setting('app.sessionUser')::uuid,
    _type,
    _timeLimit
  ) RETURNING
    "id" INTO _trainingId;

  WITH trainers AS (
    SELECT
      "trainer"
    FROM (
      SELECT
        ROW_NUMBER() OVER() AS "grp",
        jsonb_array_elements_text("value") AS "trainer"
      FROM jsonb_array_elements(_trainers)
    ) AS t
    ORDER BY "grp", random()
  )

  INSERT INTO private.training_trainers("training", "index", "config")
    SELECT
      _trainingId AS "training",
      row_number() OVER() AS "index",
      "config"
    FROM (
      SELECT
        "idx",
        unnest("configs") AS "config"
      FROM (
        SELECT
          ROW_NUMBER() OVER() AS "idx",
          (SELECT array_agg(c) FROM private.trainer__config("trainer"::public.trainer__type) AS t(c jsonb)) AS "configs"
        FROM trainers

        UNION ALL

        SELECT
          ROW_NUMBER() OVER() * 4 AS "idx",
          ARRAY["config"] AS "configs"
        FROM private.trainer__relax__config( (SELECT count(*) FROM trainers)::int / 4 ) AS c(config jsonb)
      ) AS t
      ORDER BY "idx"
    ) AS t;

  RETURN (
    SELECT
      to_jsonb(training)
    FROM (
      SELECT
        c."id",
        c."type",
        c."timeLimit",
        array_agg(t."config" || jsonb_build_object('idx', t."index") ORDER BY t."index") AS "trainers"
      FROM private.training AS c
      LEFT JOIN private.training_trainers AS t ON (t."training" = c."id")
      WHERE c."id" = _trainingId
      GROUP BY c."id"
    ) AS training
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.training__add_result(_training uuid, _idx smallint, _result jsonb) RETURNS void AS $$
BEGIN
  SELECT "id" INTO STRICT _training
  FROM private.training
  WHERE
    "id" = _training
    AND
    "owner" = current_setting('app.sessionUser')::uuid;

  UPDATE private.training_trainers
  SET
    "result" = _result
  WHERE
    "training" = _training
    AND
    "index" = _idx;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE EXCEPTION 'training % not found', _training;
  WHEN TOO_MANY_ROWS THEN
    RAISE EXCEPTION 'training % not unique', _training;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;


-- BEGIN;
-- SELECT set_config('app.sessionUser', 'd14d3606-a36b-11e9-85e5-53434870d30b', true);
-- SELECT * FROM public.training__new('everyday');
-- SELECT id, ui FROM private.training_trainers;

-- ROLLBACK;






-- CREATE OR REPLACE FUNCTION private.training__resume()
-- RETURNS trigger AS $$
-- DECLARE
--   trainers jsonb;
--   groups jsonb;
-- BEGIN
--   SELECT
--     COALESCE(jsonb_object_agg("id", "value"), '{}'::jsonb) INTO trainers
--   FROM (
--     SELECT
--       t->>'id' AS "id",
--       ROUND(AVG((r->'result')::int)) as "value"
--     FROM jsonb_array_elements(NEW."results") AS r
--     LEFT JOIN jsonb_array_elements(NEW."trainers") AS t
--       ON r->>'uuid' = t->>'uuid'
--     WHERE
--       r->>'result' IS NOT NULL
--     GROUP BY t->>'id'
--   ) t;

--   SELECT
--     COALESCE(jsonb_object_agg("id", "value"), '{}'::jsonb) INTO groups
--   FROM (
--     SELECT
--       g."group" AS "id",
--       ROUND(AVG((r."value")::int)) AS "value"
--     FROM jsonb_each(trainers) AS r("id","value")
--     LEFT JOIN public.trainer_to_group AS g
--       ON (g."trainer")::text = (r."id")::text
--     GROUP BY g."group"
--   ) t;

--   NEW."resume" = jsonb_build_object(
--     'trainers', trainers,
--     'groups', groups
--   );

--   RETURN NEW;
-- END; $$ LANGUAGE plpgsql;
-- CREATE TRIGGER training__resume__trigger
--   BEFORE INSERT OR UPDATE ON private.training FOR EACH ROW
--   EXECUTE PROCEDURE private.training__resume();

-- CREATE OR REPLACE FUNCTION public.training__new(
--   IN _type public.training__type,
--   IN _trainers jsonb,
--   OUT training_id uuid,
--   OUT training_timeLimit smallint
-- ) AS $$
-- BEGIN
--   training_timeLimit := (SELECT ("value"->(_type::text))::smallint FROM private.config WHERE "key" = 'trainingTimeLimit');
--   INSERT INTO private.training (
--     "owner",
--     "type",
--     "timeLimit",
--     "trainers"
--   ) VALUES (
--     current_setting('app.sessionUser')::uuid,
--     _type,
--     training_timeLimit,
--     _trainers
--   ) RETURNING
--     "id", "timeLimit" INTO training_id, training_timeLimit;
-- END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;



-- CREATE OR REPLACE FUNCTION public.training__finish(_id uuid) RETURNS void AS $$
-- BEGIN
--   UPDATE private.training
--   SET
--     "finish" = timezone('UTC', now())
--   WHERE
--     "owner" = current_setting('app.sessionUser')::uuid
--     AND
--     "id" = _id;
-- END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

-- CREATE VIEW public.self_training AS
--   SELECT
--     t."id",
--     t."owner",

--     t."type",
--     t."timeLimit",

--     t."start",
--     t."finish",

--     t."trainers",
--     t."results",

--     t."resume"
--   FROM
--     private.training AS t
--   WHERE
--     t."deleted" IS NULL
--     AND
--     t."owner" = current_setting('app.sessionUser')::uuid;

-- GRANT SELECT ON public.self_training TO "api-public";

-- CREATE VIEW public.self_progress AS
--   SELECT
--     jsonb_build_object(
--       'id', r."id",
--       'values', array_agg((r."value")::smallint ORDER BY t."finish"),
--       'average', ROUND(AVG((r."value")::smallint))
--     ) AS "progress"
--   FROM (
--     SELECT
--       "finish",
--       "resume"
--     FROM private.training
--     WHERE
--       "deleted" IS NULL
--       AND
--       "owner" = current_setting('app.sessionUser')::uuid
--       AND
--       "finish" IS NOT NULL
--       AND
--       "type" = 'everyday'
--     ORDER BY "finish" DESC
--     LIMIT (SELECT "value"::smallint FROM private.config WHERE "key" = 'progressItemsLimit')
--   ) AS t, jsonb_each(t."resume"->'groups') AS r("id","value")
--   GROUP BY "id";

-- GRANT SELECT ON public.self_progress TO "api-public";
