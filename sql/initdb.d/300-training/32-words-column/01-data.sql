-- DROP TABLE trainer.words_column_data CASCADE;
CREATE TABLE trainer.words_column_data (
  "id" integer NOT NULL,

  "word" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__words_column_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__words_column_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__words_column_data__check__text CHECK (char_length("word") > 0)
);

SELECT private.init_trash_scope('trainer.words_column_data');

-- DROP SEQUENCE trainer.text_words_column_data_id CASCADE;
CREATE SEQUENCE trainer.words_column_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_column_data.id;

ALTER TABLE ONLY trainer.words_column_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_column_data_id'::regclass);

CREATE INDEX trainer__words_column_data__idx__enabled ON trainer.words_column_data USING btree ("enabled");
