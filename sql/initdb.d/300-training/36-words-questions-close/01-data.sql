-- DROP TABLE trainer.words_questions_close_data CASCADE;
CREATE TABLE trainer.words_questions_close_data (
  "id" integer NOT NULL,

  "word" text NOT NULL,
  "items" jsonb[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__words_questions_close_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__words_questions_close_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__words_questions_close_data__check__word CHECK (char_length("word") > 0),
  CONSTRAINT trainer__words_questions_close_data__check__items CHECK (array_length("items", 1) > 0)
);

SELECT private.init_trash_scope('trainer.words_questions_close_data');

-- DROP SEQUENCE trainer.words_questions_close_data_id CASCADE;
CREATE SEQUENCE trainer.words_questions_close_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_questions_close_data.id;

ALTER TABLE ONLY trainer.words_questions_close_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_questions_close_data_id'::regclass);

CREATE UNIQUE INDEX trainer__words_questions_close_data__unique_idx__word
  ON trainer.words_questions_close_data USING btree ("word");

CREATE INDEX trainer__words_questions_close_data__idx__enabled
  ON trainer.words_questions_close_data USING btree ("enabled");
