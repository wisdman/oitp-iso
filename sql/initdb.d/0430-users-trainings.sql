SET search_path = "$user";

-- DROP TABLE private.users_trainings CASCADE;
CREATE TABLE private.users_trainings (
  "owner" uuid NOT NULL,
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "deleted" timestamp without time zone DEFAULT NULL,

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

CREATE INDEX users_trainings__idx__deleted ON private.users_trainings USING btree ("deleted");

CREATE INDEX users_trainings__idx__type ON private.users_trainings USING btree ("type");
CREATE INDEX users_trainings__idx__start_finish ON private.users_trainings USING btree ("start", "finish");

CREATE INDEX users_trainings__idx__configs ON private.users_trainings USING GIN ("configs" jsonb_path_ops);
CREATE INDEX users_trainings__idx__results ON private.users_trainings USING GIN ("results" jsonb_path_ops);
