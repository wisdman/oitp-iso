SET search_path = "$user";

CREATE TYPE public.training__type AS ENUM (
  'debug',    -- Отладочная
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

  CONSTRAINT training_trainers__idx__pkey PRIMARY KEY ("training", "index"),

  CONSTRAINT training_trainers__check__index CHECK ("index" >= 0),

  CONSTRAINT training_trainers__check__config CHECK (jsonb_typeof("config") = 'object'),
  CONSTRAINT training_trainers__check__result CHECK (jsonb_typeof("result") = 'object'),

  CONSTRAINT training_trainers__check__progress CHECK ("progress" >= 0 AND "progress" <= 100),

  CONSTRAINT training_trainers__check__config_id CHECK ("config"->>'id' = "id"::text),
  CONSTRAINT training_trainers__check__config_ui CHECK ("config"->>'ui' = "ui"::text),
  CONSTRAINT training_trainers__check__config_timeLimit CHECK (("config"->'timeLimit')::smallint >= 0),

  CONSTRAINT training_trainers__check__result_idx
    CHECK ("result" IS NULL OR ("result"->'idx')::smallint = "index"),

  CONSTRAINT training_trainers__fkey__training
    FOREIGN KEY ("training")
    REFERENCES private.training("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.training_trainers__id_and_ui() RETURNS trigger AS $$
BEGIN
  NEW."id" = (NEW."config"->>'id')::public.trainer__type;
  NEW."ui" = (NEW."config"->>'ui')::public.trainer__ui;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER training_trainers__id_and_ui__trigger
  BEFORE INSERT OR UPDATE ON private.training_trainers FOR EACH ROW
  EXECUTE PROCEDURE private.training_trainers__id_and_ui();
