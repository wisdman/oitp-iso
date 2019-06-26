SET search_path = "$user";

CREATE TABLE private.config (
  "key"         varchar(32) NOT NULL,
  "value"       jsonb       NOT NULL DEFAULT 'null'::jsonb,

  "deleted" timestamp without time zone DEFAULT NULL,

  "description" text        NOT NULL DEFAULT '',

  CONSTRAINT config__idx__pkey PRIMARY KEY ("key"),
  CONSTRAINT config__check__key CHECK ("key" ~ '^[a-z][0-9a-zA-Z]+$')
) WITH (OIDS = FALSE);


CREATE VIEW admin.config AS
  SELECT
    c."key",
    c."value",
    c."description"

  FROM private.config AS c
  WHERE c."deleted" IS NULL;

GRANT SELECT ON admin.config TO "api-admin";


CREATE VIEW public.config AS
  SELECT
    c."key",
    c."description",
    c."value"
  FROM private.config AS c
  WHERE c."deleted" IS NULL;

GRANT SELECT ON public.config TO "api-public";
