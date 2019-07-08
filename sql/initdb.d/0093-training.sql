SET search_path = "$user";

CREATE TYPE public.training__type AS ENUM (
  'everyday', -- Ежедневная
  'once'      -- Разовая
);

CREATE TABLE private.training (
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner" uuid NOT NULL,

  "deleted" timestamp without time zone DEFAULT NULL,

  "type"      public.training__type NOT NULL,
  "timeLimit" smallint NOT NULL,

  "start"  timestamp without time zone NOT NULL DEFAULt timezone('UTC', now()),
  "finish" timestamp without time zone DEFAULT NULL,

  CONSTRAINT training__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT training__check__timeLimit CHECK ("timeLimit" >= 0),

  CONSTRAINT training__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE INDEX training__idx__deleted ON private.training USING btree ("deleted");
CREATE INDEX training__idx__finish ON private.training USING btree ("finish");
CREATE INDEX training__idx__owner ON private.training USING btree ("owner");
CREATE INDEX training__idx__start ON private.training USING btree ("start");
CREATE INDEX training__idx__type ON private.training USING btree ("type");

CREATE TABLE private.training_trainers (
  "training" uuid NOT NULL,
  "index" smallint NOT NULL,

  "id" public.trainer__type NOT NULL,
  "ui" public.trainer__ui NOT NULL,

  "config" jsonb NOT NULL,
  "result" jsonb DEFAULT NULL,

  "progress" smallint DEFAULT NULL,

  CONSTRAINT training_trainers__idx__pkey PRIMARY KEY ("training", "index"),

  CONSTRAINT training_trainers__check__index CHECK ("index" >= 0),

  CONSTRAINT training_trainers__check__config CHECK (jsonb_typeof("config") = 'object'),
  CONSTRAINT training_trainers__check__result CHECK (jsonb_typeof("result") = 'object'),

  CONSTRAINT training_trainers__check__progress CHECK ("progress" >= 0 AND "progress" <= 100),

  CONSTRAINT training_trainers__check__config_id CHECK ("config"->>'id' = "id"::text),
  CONSTRAINT training_trainers__check__config_ui CHECK ("config"->>'ui' = "ui"::text),
  CONSTRAINT training_trainers__check__config_timeLimit CHECK (("config"->'timeLimit')::smallint >= 0),

  CONSTRAINT training_trainers__fkey__training
    FOREIGN KEY ("training")
    REFERENCES private.training("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION public.training__new(IN _type public.training__type, OUT trainingid uuid) AS $$
DECLARE
  _timeLimit smallint;
  _trainingId uuid;
BEGIN
  SELECT ("value"->(_type::text))::smallint INTO _timeLimit FROM private.config WHERE "key" = 'trainingTimeLimit';

  INSERT INTO private.training (
    "owner",
    "type",
    "timeLimit"
  ) VALUES (
    current_setting('app.sessionUser')::uuid,
    _type,
    _timeLimit
  ) RETURNING
    "id" INTO _trainingId;


END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;



BEGIN;
SELECT set_config('app.sessionUser', '2fc72f9a-8dd5-11e9-b3f0-cf67e1878440', true);
SELECT * FROM public.training__new('everyday');
ROLLBACK;






CREATE OR REPLACE FUNCTION private.training__resume()
RETURNS trigger AS $$
DECLARE
  trainers jsonb;
  groups jsonb;
BEGIN
  SELECT
    COALESCE(jsonb_object_agg("id", "value"), '{}'::jsonb) INTO trainers
  FROM (
    SELECT
      t->>'id' AS "id",
      ROUND(AVG((r->'result')::int)) as "value"
    FROM jsonb_array_elements(NEW."results") AS r
    LEFT JOIN jsonb_array_elements(NEW."trainers") AS t
      ON r->>'uuid' = t->>'uuid'
    WHERE
      r->>'result' IS NOT NULL
    GROUP BY t->>'id'
  ) t;

  SELECT
    COALESCE(jsonb_object_agg("id", "value"), '{}'::jsonb) INTO groups
  FROM (
    SELECT
      g."group" AS "id",
      ROUND(AVG((r."value")::int)) AS "value"
    FROM jsonb_each(trainers) AS r("id","value")
    LEFT JOIN public.trainer_to_group AS g
      ON (g."trainer")::text = (r."id")::text
    GROUP BY g."group"
  ) t;

  NEW."resume" = jsonb_build_object(
    'trainers', trainers,
    'groups', groups
  );

  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER training__resume__trigger
  BEFORE INSERT OR UPDATE ON private.training FOR EACH ROW
  EXECUTE PROCEDURE private.training__resume();

CREATE OR REPLACE FUNCTION public.training__new(
  IN _type public.training__type,
  IN _trainers jsonb,
  OUT training_id uuid,
  OUT training_timeLimit smallint
) AS $$
BEGIN
  training_timeLimit := (SELECT ("value"->(_type::text))::smallint FROM private.config WHERE "key" = 'trainingTimeLimit');
  INSERT INTO private.training (
    "owner",
    "type",
    "timeLimit",
    "trainers"
  ) VALUES (
    current_setting('app.sessionUser')::uuid,
    _type,
    training_timeLimit,
    _trainers
  ) RETURNING
    "id", "timeLimit" INTO training_id, training_timeLimit;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.training__add_result(_id uuid, _result jsonb) RETURNS void AS $$
BEGIN
  UPDATE private.training
  SET
    "results" = "results" || _result
  WHERE
    "owner" = current_setting('app.sessionUser')::uuid
    AND
    "id" = _id;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.training__finish(_id uuid) RETURNS void AS $$
BEGIN
  UPDATE private.training
  SET
    "finish" = timezone('UTC', now())
  WHERE
    "owner" = current_setting('app.sessionUser')::uuid
    AND
    "id" = _id;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE VIEW public.self_training AS
  SELECT
    t."id",
    t."owner",

    t."type",
    t."timeLimit",

    t."start",
    t."finish",

    t."trainers",
    t."results",

    t."resume"
  FROM
    private.training AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."owner" = current_setting('app.sessionUser')::uuid;

GRANT SELECT ON public.self_training TO "api-public";

CREATE VIEW public.self_progress AS
  SELECT
    jsonb_build_object(
      'id', r."id",
      'values', array_agg((r."value")::smallint ORDER BY t."finish"),
      'average', ROUND(AVG((r."value")::smallint))
    ) AS "progress"
  FROM (
    SELECT
      "finish",
      "resume"
    FROM private.training
    WHERE
      "deleted" IS NULL
      AND
      "owner" = current_setting('app.sessionUser')::uuid
      AND
      "finish" IS NOT NULL
      AND
      "type" = 'everyday'
    ORDER BY "finish" DESC
    LIMIT (SELECT "value"::smallint FROM private.config WHERE "key" = 'progressItemsLimit')
  ) AS t, jsonb_each(t."resume"->'groups') AS r("id","value")
  GROUP BY "id";

GRANT SELECT ON public.self_progress TO "api-public";
