-- DROP TABLE trainer.words_questions_close_data CASCADE;
CREATE TABLE trainer.words_questions_close_data (
  "id" integer NOT NULL,

  "word" text NOT NULL,
  "items" jsonb[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT words_questions_close_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT words_questions_close_data__check__id CHECK ("id" >= 0),

  CONSTRAINT words_questions_close_data__check__word CHECK (char_length("word") > 0),
  CONSTRAINT words_questions_close_data__check__items CHECK (array_length("items", 1) > 0)
);

CREATE TABLE trash.words_questions_close_data() INHERITS (trainer.words_questions_close_data, private.trash);

-- DROP SEQUENCE trainer.words_questions_close_data_id CASCADE;
CREATE SEQUENCE trainer.words_questions_close_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_questions_close_data.id;

ALTER TABLE ONLY trainer.words_questions_close_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_questions_close_data_id'::regclass);

CREATE UNIQUE INDEX words_questions_close_data__unique_idx__word
  ON trainer.words_questions_close_data USING btree ("word");

CREATE INDEX words_questions_close_data__idx__enabled
  ON trainer.words_questions_close_data USING btree ("enabled");
