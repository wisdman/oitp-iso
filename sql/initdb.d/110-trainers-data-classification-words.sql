SET search_path = "$user";

CREATE TABLE private.trainers_data_classification_words (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "group"   text    NOT NULL,
  "data"   text[]  NOT NULL,

  CONSTRAINT trainers_data_classification_words__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_classification_words AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."group" as "group",
    t."data" as "data"
  FROM private.trainers_data_classification_words t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_classification_words TO api;