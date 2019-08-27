-- DROP TABLE trainer.classification_words_data CASCADE;
CREATE TABLE trainer.classification_words_data (
  "id" integer NOT NULL,

  "group" text NOT NULL,
  "words" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__classification_words_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__classification_words_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__classification_words_data__check__group CHECK (char_length("group") > 0),
  CONSTRAINT trainer__classification_words_data__check__words CHECK (array_length("words", 1) > 0)
);

SELECT private.init_trash_scope('trainer.classification_words_data');

-- DROP SEQUENCE trainer.classification_words_data_id CASCADE;
CREATE SEQUENCE trainer.classification_words_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.classification_words_data.id;

ALTER TABLE ONLY trainer.classification_words_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.classification_words_data_id'::regclass);

CREATE UNIQUE INDEX trainer__classification_words_data__unique_idx__group
  ON trainer.classification_words_data USING btree ("group");

CREATE INDEX trainer__classification_words_data__idx__enabled
  ON trainer.classification_words_data USING btree ("enabled");
