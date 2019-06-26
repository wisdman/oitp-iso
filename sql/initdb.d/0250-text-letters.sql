SET search_path = "$user";

CREATE TABLE private.trainer_text_letters (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"   text NOT NULL,

  CONSTRAINT trainer_text_letters__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_text_letters__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_text_letters.id;

ALTER TABLE ONLY private.trainer_text_letters ALTER COLUMN id
SET DEFAULT nextval('private.trainer_text_letters__id__seq'::regclass);


CREATE VIEW admin.trainer_text_letters AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_text_letters AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_text_letters TO "api-admin";


CREATE VIEW public.trainer_text_letters AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_text_letters AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_text_letters TO "api-public";
