SET search_path = "$user";

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

  CONSTRAINT training_trainers__check__config_id CHECK ("config"->>'id' = "id"::text),
  CONSTRAINT training_trainers__check__config_ui CHECK ("config"->>'ui' = "ui"::text),

  CONSTRAINT training_trainers__check__config_complexity CHECK (("config"->'complexity')::smallint > 0),
  CONSTRAINT training_trainers__check__config_playTimeLimit CHECK (("config"->'playTimeLimit')::smallint >= 0),
  CONSTRAINT training_trainers__check__config_previewTimeLimit CHECK (("config"->'previewTimeLimit')::smallint >= 0),

  CONSTRAINT training_trainers__check__result_idx CHECK (("result"->'idx')::smallint = "index"),
  CONSTRAINT training_trainers__check__result_playTime CHECK (("result"->'playTime')::int >= 0),
  CONSTRAINT training_trainers__check__result_previewTime CHECK (("result"->'previewTime')::int >= 0),

  CONSTRAINT training_trainers__fkey__training
    FOREIGN KEY ("training")
    REFERENCES private.training("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION private.training_trainers__id_and_ui() RETURNS trigger AS $$
BEGIN
  NEW."id" = (NEW."config"->>'id')::public.trainer__type;
  NEW."ui" = (NEW."config"->>'ui')::public.trainer__ui;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER training_trainers__id_and_ui__trigger
  BEFORE INSERT OR UPDATE ON private.training_trainers FOR EACH ROW
  EXECUTE PROCEDURE private.training_trainers__id_and_ui();

CREATE INDEX training_trainers__idx__id ON private.training_trainers USING btree ("id");
CREATE INDEX training_trainers__idx__ui ON private.training_trainers USING btree ("ui");
