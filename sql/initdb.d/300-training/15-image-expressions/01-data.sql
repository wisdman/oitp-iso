-- DROP TABLE trainer.image_expressions_data CASCADE;
CREATE TABLE trainer.image_expressions_data (
  "id" int NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__image_expressions_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__image_expressions_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__image_expressions_data__check__data CHECK (char_length("data") > 0)
);

SELECT private.init_trash_scope('trainer.image_expressions_data');

CREATE INDEX trainer__image_expressions_data__idx__enabled ON trainer.image_expressions_data USING btree ("enabled");
