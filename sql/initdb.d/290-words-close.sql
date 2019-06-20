SET search_path = "$user";

CREATE TABLE private.trainer_words_close (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "word"   text NOT NULL,
  "items" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainer_words_close__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_words_close__check__items CHECK (jsonb_typeof("items") = 'array')
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_close__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_close.id;

ALTER TABLE ONLY private.trainer_words_close ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_close__id__seq'::regclass);
