-- Updated 04.06.2019
SET search_path = "$user";

CREATE TABLE private.trainers_text_tezirovanie (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "data"   text NOT NULL,

  CONSTRAINT trainers_text_tezirovanie__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_text_tezirovanie__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_text_tezirovanie.id;

ALTER TABLE ONLY private.trainers_text_tezirovanie ALTER COLUMN id
SET DEFAULT nextval('private.trainers_text_tezirovanie__id__seq'::regclass);

CREATE VIEW public.trainers_text_tezirovanie AS
  SELECT
    t."id" AS "id",
    t."enabled" AS "enabled",

    t."data" AS "data"
  FROM private.trainers_text_tezirovanie t
  WHERE NOT t."deleted";

GRANT SELECT ON  public.trainers_text_tezirovanie TO api;
