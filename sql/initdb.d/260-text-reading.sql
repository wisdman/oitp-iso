-- Updated 04.06.2019
SET search_path = "$user";

CREATE TABLE private.trainer_text_reading (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"   text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  "questions" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainer_text_reading__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_text_reading__check__questions CHECK (jsonb_typeof("questions") = 'array')
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_text_reading__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_text_reading.id;

ALTER TABLE ONLY private.trainer_text_reading ALTER COLUMN id
SET DEFAULT nextval('private.trainer_text_reading__id__seq'::regclass);
