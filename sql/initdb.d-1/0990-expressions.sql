SET search_path = "$user";

-- DROP TABLE private.expressions CASCADE;
CREATE TABLE private.expressions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"   text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  PRIMARY KEY ("id")
);

CREATE SEQUENCE private.expressions__id__seq
  AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1 OWNED BY private.expressions.id;
ALTER TABLE ONLY private.expressions ALTER COLUMN id SET DEFAULT nextval('private.expressions__id__seq'::regclass);

-- DROP VIEW public.expressions CASCADE;
CREATE VIEW public.expressions AS
  SELECT
    t."id" AS "id",
    t."data" AS "data",
    t."author" AS "author"
  FROM private.expressions AS t
  WHERE (t."deleted" IS NULL OR t."deleted" > timezone('UTC', now()))
    AND t."enabled";

GRANT SELECT ON public.expressions TO "api-public";
