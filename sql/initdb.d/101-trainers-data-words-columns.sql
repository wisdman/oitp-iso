SET search_path = "$user";

CREATE TABLE private.trainers_data_words_columns (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"    text    NOT NULL,

  CONSTRAINT trainers_data_words_columns__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_words_columns AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."word" as "word"
  FROM private.trainers_data_words_columns t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_words_columns TO api;