-- DROP TABLE trainer.classification_colors_data CASCADE;
CREATE TABLE trainer.classification_colors_data (
  "id" integer NOT NULL,

  "color" varchar(7) DEFAULT NULL,
  "title" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__classification_colors_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__classification_colors_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__classification_colors_data__check__color CHECK (public.check_color("color")),
  CONSTRAINT trainer__classification_colors_data__check__title CHECK (char_length("title") > 0)
);

SELECT private.init_trash_scope('trainer.classification_colors_data');

-- DROP SEQUENCE trainer.classification_colors_data_id CASCADE;
CREATE SEQUENCE trainer.classification_colors_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.classification_colors_data.id;

ALTER TABLE ONLY trainer.classification_colors_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.classification_colors_data_id'::regclass);

CREATE UNIQUE INDEX trainer__classification_colors_data__unique_idx__color
  ON trainer.classification_colors_data USING btree ("color");

CREATE INDEX trainer__classification_colors_data__idx__enabled
  ON trainer.classification_colors_data USING btree ("enabled");

