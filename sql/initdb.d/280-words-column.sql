-- Updated 05.06.2019
SET search_path = "$user";

CREATE TABLE private.trainer_words_column (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "word"   text NOT NULL,

  CONSTRAINT trainer_words_column__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_column__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_column.id;

ALTER TABLE ONLY private.trainer_words_column ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_column__id__seq'::regclass);

CREATE UNIQUE INDEX trainer_words_column__idx__unique_word ON private.trainer_words_column USING btree ("word");
