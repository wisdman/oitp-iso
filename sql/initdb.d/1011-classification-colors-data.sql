SET search_path = "$user";

-- DROP TABLE trainer.classification_colors_data CASCADE;
CREATE TABLE trainer.classification_colors_data (
  "id" integer NOT NULL,

  "color" varchar(7) DEFAULT NULL,
  "title" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT classification_colors_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT classification_colors_data__check__id CHECK ("id" >= 0),

  CONSTRAINT classification_colors_data__check__color CHECK (public.check_color("color")),
  CONSTRAINT classification_colors_data__check__title CHECK (char_length("title") > 0)
);

-- DROP SEQUENCE trainer.classification_colors_data_id CASCADE;
CREATE SEQUENCE trainer.classification_colors_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.classification_colors_data.id;

ALTER TABLE ONLY trainer.classification_colors_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.classification_colors_data_id'::regclass);

CREATE UNIQUE INDEX classification_colors_data__unique_idx__color
  ON trainer.classification_colors_data USING btree ("color") WHERE "deleted" IS NULL;

CREATE INDEX classification_colors_data__idx__enabled_deleted
  ON trainer.classification_colors_data USING btree ("enabled", "deleted");

