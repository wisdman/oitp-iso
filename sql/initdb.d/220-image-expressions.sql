-- Updated 04.06.2019
SET search_path = "$user";

CREATE TABLE private.trainer_image_expressions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data" text NOT NULL,

  CONSTRAINT trainer_image_expressions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
