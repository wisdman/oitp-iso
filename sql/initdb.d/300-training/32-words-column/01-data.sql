-- DROP TABLE trainer.text_words_column_data CASCADE;
CREATE TABLE trainer.text_words_column_data (
  "id" integer NOT NULL,

  "word" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT text_words_column_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT text_words_column_data__check__id CHECK ("id" >= 0),

  CONSTRAINT text_words_column_data__check__text CHECK (char_length("word") > 0)
);

CREATE TABLE trash.text_words_column_data() INHERITS (trainer.text_words_column_data, private.trash);

-- DROP SEQUENCE trainer.text_words_column_data_id CASCADE;
CREATE SEQUENCE trainer.text_words_column_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.text_words_column_data.id;

ALTER TABLE ONLY trainer.text_words_column_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.text_words_column_data_id'::regclass);

CREATE INDEX text_words_column_data__idx__enabled
  ON trainer.text_words_column_data USING btree ("enabled");
