SET search_path = "$user";

CREATE TABLE private.trainers_text_reading (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "data"   text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  "questions" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainers_text_reading__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_text_reading__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_text_reading.id;

ALTER TABLE ONLY private.trainers_text_reading ALTER COLUMN id
SET DEFAULT nextval('private.trainers_text_reading__id__seq'::regclass);

CREATE VIEW public.trainers_text_reading AS
  SELECT
    t."id" AS "id",
    t."enabled" AS "enabled",

    t."data" AS "data",
    t."author" AS "author",

    t."questions" AS "questions"
  FROM private.trainers_text_reading t
  WHERE NOT t."deleted";

GRANT SELECT ON  public.trainers_text_reading TO api;
