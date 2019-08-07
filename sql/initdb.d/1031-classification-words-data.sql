SET search_path = "$user";

-- DROP TABLE trainer.classification_words_data CASCADE;
CREATE TABLE trainer.classification_words_data (
  "group" text NOT NULL,
  "words" text[] NOT NULL DEFAULT '{}'::text[],

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT classification_words_data__pkey PRIMARY KEY ("group"),
  CONSTRAINT classification_words_data__check__group CHECK (char_length("group") > 0)
);

CREATE INDEX classification_words_data__idx__enabled_deleted
  ON trainer.classification_words_data USING btree ("enabled", "deleted");
