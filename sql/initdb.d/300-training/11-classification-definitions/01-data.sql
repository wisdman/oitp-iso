-- DROP TABLE trainer.classification_definitions_data CASCADE;
CREATE TABLE trainer.classification_definitions_data (
  "id" integer NOT NULL,

  "word" text NOT NULL,
  "definitions" text[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__classification_definitions_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__classification_definitions_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__classification_definitions_data__check__word CHECK (char_length("word") > 0),
  CONSTRAINT trainer__classification_definitions_data__check__definitions CHECK (array_length("definitions", 1) > 0)
);

SELECT private.init_trash_scope('trainer.classification_definitions_data');

-- DROP SEQUENCE trainer.classification_definitions_data_id CASCADE;
CREATE SEQUENCE trainer.classification_definitions_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.classification_definitions_data.id;

ALTER TABLE ONLY trainer.classification_definitions_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.classification_definitions_data_id'::regclass);

CREATE UNIQUE INDEX trainer__classification_definitions_data__unique_idx__word
  ON trainer.classification_definitions_data USING btree ("word");

CREATE INDEX trainer__classification_definitions_data__idx__enabled
  ON trainer.classification_definitions_data USING btree ("enabled");
