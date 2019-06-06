-- Updated 05.06.2019
SET search_path = "$user";

CREATE TABLE private.trainers_words_column (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"   text NOT NULL,

  CONSTRAINT trainers_words_column__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_words_column__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_words_column.id;

ALTER TABLE ONLY private.trainers_words_column ALTER COLUMN id
SET DEFAULT nextval('private.trainers_words_column__id__seq'::regclass);

CREATE VIEW public.trainers_words_column AS
  SELECT
    t."id" AS "id",
    t."enabled" AS "enabled",

    t."word" AS "word"
  FROM private.trainers_words_column t
  WHERE NOT t."deleted";

GRANT SELECT ON  public.trainers_words_column TO api;
