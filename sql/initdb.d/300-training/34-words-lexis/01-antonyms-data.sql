-- DROP TABLE trainer.words_lexis_antonyms_data CASCADE;
CREATE TABLE trainer.words_lexis_antonyms_data (
  "id" integer NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__words_lexis_antonyms_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__words_lexis_antonyms_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__words_lexis_antonyms_data__check__wordA CHECK (char_length("wordA") > 0),
  CONSTRAINT trainer__words_lexis_antonyms_data__check__wordB CHECK (char_length("wordB") > 0)
);

SELECT private.init_trash_scope('trainer.words_lexis_antonyms_data');

-- DROP SEQUENCE trainer.text_words_column_data_id CASCADE;
CREATE SEQUENCE trainer.words_lexis_antonyms_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_lexis_antonyms_data.id;

ALTER TABLE ONLY trainer.words_lexis_antonyms_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_lexis_antonyms_data_id'::regclass);

CREATE UNIQUE INDEX trainer__words_lexis_antonyms_data__unique_idx__wordA_wordB
  ON trainer.words_lexis_antonyms_data USING btree ("wordA", "wordB");

CREATE INDEX trainer__words_lexis_antonyms_data__idx__enabled
  ON trainer.words_lexis_antonyms_data USING btree ("enabled");
