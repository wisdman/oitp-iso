-- Updated 05.06.2019
SET search_path = "$user";

CREATE TYPE public.trainer_words_lexis_relation AS ENUM (
  'antonyms', -- Антонимы
  'paronyms', -- Паронимы
  'synonyms'  -- Синонимы
);

CREATE TABLE private.trainer_words_lexis (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "relation" public.trainer_words_lexis_relation NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  CONSTRAINT trainer_words_lexis__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_words_lexis__check__wordA CHECK (char_length("wordA") > 0),
  CONSTRAINT trainer_words_lexis__check__wordB CHECK (char_length("wordB") > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_lexis__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_lexis.id;

ALTER TABLE ONLY private.trainer_words_lexis ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_lexis__id__seq'::regclass);
