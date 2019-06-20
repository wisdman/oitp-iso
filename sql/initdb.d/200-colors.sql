SET search_path = "$user";

CREATE TABLE private.trainer_colors (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data"  text NOT NULL,
  "color" varchar(7) DEFAULT NULL,

  CONSTRAINT trainer_colors__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_colors__check__color CHECK ("color" ~ '^#[0-9a-f]{6}$')
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_colors__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_colors.id;

ALTER TABLE ONLY private.trainer_colors ALTER COLUMN id
SET DEFAULT nextval('private.trainer_colors__id__seq'::regclass);
