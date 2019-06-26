SET search_path = "$user";

CREATE TABLE private.trainer_image_expressions (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "data" text NOT NULL,

  CONSTRAINT trainer_image_expressions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);


CREATE VIEW admin.trainer_image_expressions AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_image_expressions AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_image_expressions TO "api-admin";


CREATE VIEW public.trainer_image_expressions AS
  SELECT
    t."id",
    t."enabled",

    t."data"
  FROM private.trainer_image_expressions AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_image_expressions TO "api-public";
