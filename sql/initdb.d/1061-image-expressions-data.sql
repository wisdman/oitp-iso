SET search_path = "$user";

-- DROP TABLE trainer.image_expressions_data CASCADE;
CREATE TABLE trainer.image_expressions_data (
  "id" int NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT image_expressions_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT image_expressions_data__check__id CHECK ("id" >= 0),

  CONSTRAINT image_expressions_data__check__data CHECK (char_length("data") > 0)
);

CREATE INDEX image_expressions_data__idx__enabled_deleted
  ON trainer.image_expressions_data USING btree ("enabled", "deleted");
