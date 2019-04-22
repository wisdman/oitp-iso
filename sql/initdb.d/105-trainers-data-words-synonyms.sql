SET search_path = "$user";

CREATE TABLE private.trainers_data_words_synonyms (
  "id"       uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled"  boolean NOT NULL DEFAULT TRUE,
  "deleted"  boolean NOT NULL DEFAULT FALSE,

  "synonyms" text[]  NOT NULL,

  CONSTRAINT trainers_data_words_synonyms__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_words_synonyms AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."synonyms" as "synonyms"
  FROM private.trainers_data_words_synonyms t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_words_synonyms TO api;