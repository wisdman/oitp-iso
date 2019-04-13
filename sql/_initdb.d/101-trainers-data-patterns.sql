SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

CREATE TABLE trainers_data_patterns (
  "id"      uuid       NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean    NOT NULL DEFAULT TRUE,
  "deleted" boolean    NOT NULL DEFAULT FALSE,

  "data"    smallint[] NOT NULL DEFAULT '{}'::smallint[],

  CONSTRAINT trainers_data_patterns__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

-- Prevent change id
CREATE TRIGGER trainers_data_patterns__prevent_change_id__trigger
  BEFORE UPDATE ON trainers_data_patterns FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

  -- Scann indexes
CREATE INDEX trainers_data_patterns__idx__enabled ON trainers USING btree("enabled");
CREATE INDEX trainers_data_patterns__idx__deleted ON trainers USING btree("deleted");
