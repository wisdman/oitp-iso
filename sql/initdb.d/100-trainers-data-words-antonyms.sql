SET search_path = "$user";

CREATE TABLE private.trainers_data_words_antonyms (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"     text   NOT NULL,
  "antonyms" text[] NOT NULL,

  CONSTRAINT trainers_data_words_antonyms__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_words_antonyms AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."word" as "word",
    t."antonyms" as "antonyms"
  FROM private.trainers_data_words_antonyms t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_words_antonyms TO api;