SET search_path = "$user";

CREATE TABLE private.trainer_words_waste (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "items" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainer_words_waste__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer_words_waste__check__items CHECK (jsonb_typeof("items") = 'array')
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_waste__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_waste.id;

ALTER TABLE ONLY private.trainer_words_waste ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_waste__id__seq'::regclass);


CREATE VIEW admin.trainer_words_waste AS
  SELECT
    t."id",
    t."enabled",

    t."items"
  FROM private.trainer_words_waste AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_words_waste TO "api-admin";


CREATE VIEW public.trainer_words_waste AS
  SELECT
    t."id",
    t."enabled",

    t."items"
  FROM private.trainer_words_waste AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_waste TO "api-public";
