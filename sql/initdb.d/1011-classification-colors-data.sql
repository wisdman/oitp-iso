SET search_path = "$user";

-- DROP TABLE trainer.classification_colors_data CASCADE;
CREATE TABLE trainer.classification_colors_data (
  "color" varchar(7) DEFAULT NULL,
  "title" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT classification_colors_data__pkey PRIMARY KEY ("color"),

  CONSTRAINT classification_colors_data__check__color CHECK (public.check_color("color")),
  CONSTRAINT classification_colors_data__check__title CHECK (char_length("title") > 0)
);

CREATE INDEX classification_colors_data__idx__enabled_deleted
  ON trainer.classification_colors_data USING btree ("enabled", "deleted");
