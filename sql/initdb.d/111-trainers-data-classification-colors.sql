SET search_path = "$user";

CREATE TABLE private.trainers_data_classification_colors (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "title"   text    NOT NULL,
  "color"   char(6) NOT NULL,

  CONSTRAINT trainers_data_classification_colors__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainers_data_classification_colors__check__color CHECK ("color" ~ '^[0-9a-f]{6}$')
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_classification_colors AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."title" as "title",
    t."color" as "color"
  FROM private.trainers_data_classification_colors t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_classification_colors TO api;