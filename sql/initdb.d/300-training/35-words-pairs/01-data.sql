-- DROP TABLE trainer.words_pairs_data CASCADE;
CREATE TABLE trainer.words_pairs_data (
  "id" integer NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT words_pairs_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT words_pairs_data__check__id CHECK ("id" >= 0),

  CONSTRAINT words_pairs_data__check__wordA CHECK (char_length("wordA") > 0),
  CONSTRAINT words_pairs_data__check__wordB CHECK (char_length("wordB") > 0)
);

CREATE TABLE trash.words_pairs_data() INHERITS (trainer.words_pairs_data, private.trash);

-- DROP SEQUENCE trainer.words_pairs_data_id CASCADE;
CREATE SEQUENCE trainer.words_pairs_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_pairs_data.id;

ALTER TABLE ONLY trainer.words_pairs_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_pairs_data_id'::regclass);

CREATE UNIQUE INDEX words_pairs_data__unique_idx__wordA_wordB
  ON trainer.words_pairs_data USING btree ("wordA", "wordB");

CREATE INDEX words_pairs_data__idx__enabled
  ON trainer.words_pairs_data USING btree ("enabled");
