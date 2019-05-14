SET search_path = "$user";

CREATE TABLE private.trainers_image_expressions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "data" text NOT NULL,

  CONSTRAINT trainers_image_expressions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_image_expressions AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."data" as "data"
  FROM private.trainers_image_expressions t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_image_expressions TO api;
