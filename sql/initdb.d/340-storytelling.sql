SET search_path = "$user";

CREATE TABLE private.trainer_storytelling (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "questions" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainer_storytelling__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_storytelling__check__questions CHECK (jsonb_typeof("questions") = 'array')
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_storytelling__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_storytelling.id;

ALTER TABLE ONLY private.trainer_storytelling ALTER COLUMN id
SET DEFAULT nextval('private.trainer_storytelling__id__seq'::regclass);
