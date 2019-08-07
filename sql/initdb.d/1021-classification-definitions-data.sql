SET search_path = "$user";

-- DROP TABLE trainer.classification_definitions_data CASCADE;
CREATE TABLE trainer.classification_definitions_data (
  "word" text NOT NULL,
  "definitions" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT classification_definitions_data__pkey PRIMARY KEY ("word"),
  CONSTRAINT classification_definitions_data__check__word CHECK (char_length("word") > 0)
);

CREATE INDEX classification_definitions_data__idx__enabled_deleted
  ON trainer.classification_definitions_data USING btree ("enabled", "deleted");
