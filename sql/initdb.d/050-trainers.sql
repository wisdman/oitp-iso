SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

CREATE TYPE trainers__id AS ENUM (
  'numbers',
  'palette'
);

CREATE TABLE trainers (
  "id"      trainers__id NOT NULL,
  "enabled" boolean      NOT NULL DEFAULT TRUE,
  "deleted" boolean      NOT NULL DEFAULT FALSE,

  "config"  jsonb        NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT trainers__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainers__check__config  CHECK ("config"::text ~ '^{')
) WITH (OIDS = FALSE);

-- Prevent change id
CREATE TRIGGER trainers__prevent_change_id__trigger
  BEFORE UPDATE ON trainers FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

  -- Scann indexes
CREATE INDEX trainers__idx__fkey_owner ON trainers USING btree ("owner");
CREATE INDEX trainers__idx__expires    ON trainers USING btree ("expires");
