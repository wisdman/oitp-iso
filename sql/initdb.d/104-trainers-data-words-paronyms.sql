SET search_path = "$user";

CREATE TABLE private.trainers_data_words_paronyms (
  "id"       uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled"  boolean NOT NULL DEFAULT TRUE,
  "deleted"  boolean NOT NULL DEFAULT FALSE,

  "paronyms" text[]  NOT NULL,

  CONSTRAINT trainers_data_words_paronyms__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
