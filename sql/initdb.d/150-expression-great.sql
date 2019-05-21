SET search_path = "$user";

CREATE TABLE private.expression_great (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "data"   text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  CONSTRAINT expression_great__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.expression_great__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.expression_great.id;

ALTER TABLE ONLY private.expression_great ALTER COLUMN id
SET DEFAULT nextval('private.expression_great__id__seq'::regclass);

CREATE VIEW public.expression_great AS
  SELECT
    t."id" AS "id",
    t."enabled" AS "enabled",

    t."data" AS "data",
    t."author" AS "author"
  FROM private.expression_great t
  WHERE NOT t."deleted";

GRANT SELECT ON public.expression_great TO api;