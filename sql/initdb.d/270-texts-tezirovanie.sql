SET search_path = "$user";

CREATE TABLE private.trainer_text_tezirovanie (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"   text NOT NULL,

  CONSTRAINT trainer_text_tezirovanie__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_text_tezirovanie__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_text_tezirovanie.id;

ALTER TABLE ONLY private.trainer_text_tezirovanie ALTER COLUMN id
SET DEFAULT nextval('private.trainer_text_tezirovanie__id__seq'::regclass);
