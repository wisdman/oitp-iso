SET search_path = "$user";

CREATE TABLE private.files (
  "id"      oid     NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "mime"        text         NOT NULL DEFAULT 'application/octet-stream',
  "title"       varchar(64)  NOT NULL DEFAULT '',
  "description" text         NOT NULL DEFAULT '',

  CONSTRAINT files__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

-- Clean lage objects store
CREATE OR REPLACE FUNCTION private.prune_lo_files() RETURNS bigint AS $$
  SELECT COUNT(lo_unlink(l.oid))
  FROM pg_largeobject_metadata l
  WHERE (NOT EXISTS (SELECT 1 FROM private.files f WHERE f."id" = l.oid));
$$ LANGUAGE SQL;


CREATE VIEW admin.files AS
  SELECT
    f."id",
    f."enabled",

    f."mime",
    f."title",
    f."description"
  FROM private.files AS f
  WHERE f."deleted" IS NULL;

GRANT SELECT ON admin.files TO "api-admin";


CREATE VIEW public.files AS
  SELECT
    f."id",
    f."mime",
    f."title",
    f."description"
  FROM private.files AS f
  WHERE
    f."deleted" IS NULL
    AND
    f."enabled";

GRANT SELECT ON public.files TO "api-public";
