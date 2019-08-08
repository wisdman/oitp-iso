SET search_path = "$user";

-- DROP TABLE trainer.words_lexis_paronyms_data CASCADE;
CREATE TABLE trainer.words_lexis_paronyms_data (
  "id" integer NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT words_lexis_paronyms_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT words_lexis_paronyms_data__check__id CHECK ("id" >= 0),

  CONSTRAINT words_lexis_paronyms_data__check__wordA CHECK (char_length("wordA") > 0),
  CONSTRAINT words_lexis_paronyms_data__check__wordB CHECK (char_length("wordB") > 0)
);

-- DROP SEQUENCE trainer.words_lexis_paronyms_data_id CASCADE;
CREATE SEQUENCE trainer.words_lexis_paronyms_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_lexis_paronyms_data.id;

ALTER TABLE ONLY trainer.words_lexis_paronyms_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_lexis_paronyms_data_id'::regclass);

CREATE UNIQUE INDEX words_lexis_paronyms_data__unique_idx__wordA_wordB
  ON trainer.words_lexis_paronyms_data USING btree ("wordA", "wordB") WHERE "deleted" IS NULL;

CREATE INDEX words_lexis_paronyms_data__idx__enabled_deleted
  ON trainer.words_lexis_paronyms_data USING btree ("enabled", "deleted");
