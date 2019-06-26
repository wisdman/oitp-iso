SET search_path = "$user";

CREATE TYPE public.trainer_patterns__type AS ENUM (
  'images', -- Для изображений
  'numbers' -- Для чисел
);

CREATE TABLE private.trainer_patterns (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "type" public.trainer_patterns__type NOT NULL,
  "data" smallint[] NOT NULL,

  CONSTRAINT trainer_patterns__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer_patterns__check__data CHECK (array_length("data", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_patterns__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_patterns.id;

ALTER TABLE ONLY private.trainer_patterns ALTER COLUMN id
SET DEFAULT nextval('private.trainer_patterns__id__seq'::regclass);


CREATE VIEW admin.trainer_patterns AS
  SELECT
    t."id",
    t."enabled",

    t."type",
    t."data"
  FROM private.trainer_patterns AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_patterns TO "api-admin";


CREATE VIEW public.trainer_patterns AS
  SELECT
    t."id",
    t."enabled",

    t."type",
    t."data"
  FROM private.trainer_patterns AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_patterns TO "api-public";
