SET search_path = "$user";

CREATE TABLE private.expressions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"   text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  CONSTRAINT expressions__idx__pkey PRIMARY KEY ("id")
);

CREATE SEQUENCE private.expressions__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.expressions.id;

ALTER TABLE ONLY private.expressions ALTER COLUMN id
SET DEFAULT nextval('private.expressions__id__seq'::regclass);


CREATE VIEW admin.expressions AS
  SELECT
    e."id" AS "id",
    e."enabled" AS "enabled",

    e."data" AS "data",
    e."author" AS "author"
  FROM private.expressions AS e
  WHERE e."deleted" IS NULL;

GRANT SELECT ON admin.expressions TO "api-admin";


CREATE VIEW public.expressions AS
  SELECT
    e."id" AS "id",
    e."enabled" AS "enabled",

    e."data" AS "data",
    e."author" AS "author"
  FROM private.expressions AS e
  WHERE
    e."deleted" IS NULL
    AND
    e."enabled";

GRANT SELECT ON public.expressions TO "api-public";
