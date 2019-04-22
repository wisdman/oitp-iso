SET search_path = "$user";

CREATE TABLE private.trainers_data_icons (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "data"    text    NOT NULL,

  CONSTRAINT trainers_data_icons__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_icons AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."data" as "data"

  FROM private.trainers_data_icons t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_icons TO api;