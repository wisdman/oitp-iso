SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

CREATE TABLE files (
  "id"          oid          NOT NULL,
  "enabled"     boolean      NOT NULL DEFAULT TRUE,
  "deleted"     boolean      NOT NULL DEFAULT FALSE,
  "mime"        text         NOT NULL DEFAULT 'application/octet-stream',
  "title"       varchar(64)  NOT NULL DEFAULT '',
  "description" varchar(128) NOT NULL DEFAULT '',

  CONSTRAINT files__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

-- Prevent change id
CREATE TRIGGER files__prevent_change_id__trigger
  BEFORE UPDATE ON files FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

-- Scann indexes
CREATE INDEX files__idx__enabled ON files USING btree("enabled");
CREATE INDEX files__idx__deleted ON files USING btree("deleted");

-- Clean lage objects store
CREATE FUNCTION prune_lo_files() RETURNS bigint AS $$
  SELECT COUNT(lo_unlink(l.oid))
  FROM pg_largeobject_metadata l
  WHERE (NOT EXISTS (SELECT 1 FROM files f WHERE f."id" = l.oid));
$$ LANGUAGE SQL;
