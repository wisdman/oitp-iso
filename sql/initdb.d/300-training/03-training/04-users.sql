-- DROP TABLE private.users_trainings CASCADE;
CREATE TABLE private.users_trainings (
  "owner" uuid NOT NULL,
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "type" public.training_type NOT NULL,
  "timeLimit" smallint NOT NULL DEFAULT 0,

  "start"  timestamp without time zone NOT NULL DEFAULt timezone('UTC', now()),
  "finish" timestamp without time zone DEFAULT NULL,

  "configs" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "results" jsonb NOT NULL DEFAULT '[]'::jsonb,

  "progress" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT users_trainings__pkey PRIMARY KEY ("owner", "id"),

  CONSTRAINT users_trainings__check__timeLimit CHECK ("timeLimit" > 0),
  CONSTRAINT users_trainings__check__configs CHECK (jsonb_typeof("configs") = 'array'),
  CONSTRAINT users_trainings__check__results CHECK (jsonb_typeof("results") = 'array'),
  CONSTRAINT users_trainings__check__progress CHECK (jsonb_typeof("progress") = 'object'),

  CONSTRAINT users_trainings__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE trash.users_trainings() INHERITS (private.users_trainings, private.trash);

CREATE INDEX users_trainings__idx__type ON private.users_trainings USING btree ("type");
CREATE INDEX users_trainings__idx__start_finish ON private.users_trainings USING btree ("start", "finish");

CREATE INDEX users_trainings__idx__configs ON private.users_trainings USING GIN ("configs" jsonb_path_ops);
CREATE INDEX users_trainings__idx__results ON private.users_trainings USING GIN ("results" jsonb_path_ops);
CREATE INDEX users_trainings__idx__progress ON private.users_trainings USING GIN ("progress" jsonb_path_ops);

CREATE OR REPLACE FUNCTION private.users_trainings__trigger__progress() RETURNS trigger AS $$
DECLARE
  results jsonb;
BEGIN
  SELECT jsonb_agg(t) INTO STRICT results
  FROM (
    SELECT "group" AS "id", ROUND(AVG("result")) AS "result"
    FROM (
      SELECT
        (c->>'id')::public.trainer_type AS "id",
        (r->'result')::smallint AS "result"
      FROM
        jsonb_array_elements(NEW."results") AS r,
        jsonb_array_elements(NEW."configs") AS c
      WHERE (r->'idx')::smallint = (c->'idx')::smallint
        AND (r->>'result') IS NOT NULL
    ) AS r
    LEFT JOIN public.trainers_by_groups AS g ON (g."trainer" = r."id")
    WHERE g."group" IS NOT NULL
    GROUP BY "group"
  ) AS t;

  NEW."progress" = jsonb_build_object(
    'results', results,
    'result',  (SELECT ROUND(AVG((r->'result')::smallint)) FROM jsonb_array_elements(results) AS r)
  );
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER progress BEFORE INSERT OR UPDATE ON private.users_trainings FOR EACH ROW
  EXECUTE PROCEDURE private.users_trainings__trigger__progress();
