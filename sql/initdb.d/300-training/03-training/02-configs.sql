-- DROP TABLE private.training_configs CASCADE;
CREATE TABLE private.training_configs (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "enabled" boolean NOT NULL DEFAULT TRUE,

  "type" public.training_type NOT NULL,
  "timeLimit" smallint NOT NULL,
  "trainers" jsonb NOT NULL,

  "description" text NOT NULL DEFAULT '',

  CONSTRAINT training_configs__pkey PRIMARY KEY ("id"),

  CONSTRAINT training_configs__check__timeLimit CHECK ("timeLimit" > 0),
  CONSTRAINT training_configs__check__trainers CHECK (
    jsonb_typeof("trainers") = 'array' AND public.check_trainer_type_array("trainers")
  )
);

CREATE TABLE trash.training_configs() INHERITS (private.training_configs, private.trash);

CREATE INDEX training_configs__idx__enabled ON private.training_configs USING btree ("enabled");
