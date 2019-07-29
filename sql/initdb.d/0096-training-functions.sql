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

CREATE OR REPLACE FUNCTION public.training__finish(_training uuid, _results jsonb) RETURNS smallint AS $$
BEGIN
  UPDATE private.training
  SET "finish" = timezone('UTC', now())
  WHERE
    "id" = _training
    AND
    "owner" = current_setting('app.sessionUser')::uuid
  RETURNING "id" INTO STRICT _training;

  UPDATE private.training_trainers
  SET "result" = t."value"
  FROM jsonb_array_elements(_results) AS t
  WHERE
    "training" = _training
    AND
    "index" = (t."value"->'idx')::smallint;

  RETURN (
    SELECT ROUND(AVG(("result"->>'result')::smallint))
    FROM private.training_trainers
    WHERE "training" = _training
  );

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE EXCEPTION 'training % not found', _training;
  WHEN TOO_MANY_ROWS THEN
    RAISE EXCEPTION 'training % not unique', _training;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
