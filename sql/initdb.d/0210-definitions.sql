SET search_path = "$user";

CREATE TABLE private.trainer_definitions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "word"  text NOT NULL,
  "definitions" text[] NOT NULL DEFAULT '{}'::text[],

  CONSTRAINT trainer_definitions__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer_definitions__check__definitions CHECK (array_length("definitions", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_definitions__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_definitions.id;

ALTER TABLE ONLY private.trainer_definitions ALTER COLUMN id
SET DEFAULT nextval('private.trainer_definitions__id__seq'::regclass);


CREATE VIEW admin.trainer_definitions AS
  SELECT
    t."id",
    t."enabled",

    t."word",
    t."definitions"
  FROM private.trainer_definitions AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_definitions TO "api-admin";


CREATE VIEW public.trainer_definitions AS
  SELECT
    t."id",
    t."enabled",

    t."word",
    t."definitions"
  FROM private.trainer_definitions AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_definitions TO "api-public";
