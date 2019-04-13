SET search_path = "$user";

CREATE TABLE private.trainers_data_words_definitions (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"        text   NOT NULL,
  "definitions" text[] NOT NULL,

  CONSTRAINT trainers_data_words_definitions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);