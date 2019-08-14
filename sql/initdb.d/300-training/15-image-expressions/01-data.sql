-- DROP TABLE trainer.image_expressions_data CASCADE;
CREATE TABLE trainer.image_expressions_data (
  "id" int NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT image_expressions_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT image_expressions_data__check__id CHECK ("id" >= 0),

  CONSTRAINT image_expressions_data__check__data CHECK (char_length("data") > 0)
);

CREATE TABLE trash.image_expressions_data() INHERITS (trainer.image_expressions_data, private.trash);

CREATE INDEX image_expressions_data__idx__enabled
  ON trainer.image_expressions_data USING btree ("enabled");
