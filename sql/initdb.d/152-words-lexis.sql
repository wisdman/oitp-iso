-- Updated 05.06.2019
SET search_path = "$user";

CREATE TYPE public.trainers_words_lexis_relation AS ENUM (
  'antonyms', -- Антонимы
  'paronyms', -- Паронимы
  'synonyms'  -- Синонимы
);

CREATE TABLE private.trainers_words_lexis (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "relation" public.trainers_words_lexis_relation NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  CONSTRAINT trainers_words_lexis__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_words_lexis__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_words_lexis.id;

ALTER TABLE ONLY private.trainers_words_lexis ALTER COLUMN id
SET DEFAULT nextval('private.trainers_words_lexis__id__seq'::regclass);

CREATE VIEW public.trainers_words_lexis AS
  SELECT
    t."id" AS "id",
    t."enabled" AS "enabled",

    t."relation" AS "relation",

    t."wordA" AS "wordA",
    t."wordB" AS "wordB"
  FROM private.trainers_words_lexis t
  WHERE NOT t."deleted";

GRANT SELECT ON  public.trainers_words_lexis TO api;
