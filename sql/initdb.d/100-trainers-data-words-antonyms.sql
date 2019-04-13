SET search_path = "$user";

CREATE TABLE private.trainers_data_words_antonyms (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"     text   NOT NULL,
  "antonyms" text[] NOT NULL,

  CONSTRAINT trainers_data_words_antonyms__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
