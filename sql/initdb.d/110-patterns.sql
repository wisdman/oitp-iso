SET search_path = "$user";

CREATE TYPE public.trainers_pattern AS ENUM (
  'images', -- Для изображений
  'numbers' -- Для чисел
);

CREATE TABLE private.trainers_patterns (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_pattern NOT NULL,
  "data" smallint[] NOT NULL,

  CONSTRAINT trainers_patterns__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_patterns__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_patterns.id;

ALTER TABLE ONLY private.trainers_patterns ALTER COLUMN id
SET DEFAULT nextval('private.trainers_patterns__id__seq'::regclass);

CREATE VIEW public.trainers_patterns AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."type" as "type",
    t."data" as "data"
  FROM private.trainers_patterns t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_patterns TO api;