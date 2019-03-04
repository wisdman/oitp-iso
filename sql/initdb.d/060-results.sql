SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

CREATE TYPE training__type AS ENUM (
  'everyday',
  'once'
);

CREATE TABLE results (
  "id"            uuid           NOT NULL DEFAULT uuid_generate_v1(),
  "enabled"       boolean        NOT NULL DEFAULT TRUE,
  "deleted"       boolean        NOT NULL DEFAULT FALSE,

  "user"          uuid           NOT NULL,
  "training"      training__type NOT NULL,
  "serial"        smallint       NOT NULL,
  "trainer"       trainers__id   NOT NULL,

  "result"        jsonb NOT NULL DEFAULT '{}'::jsonb,
  "steps"         jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT results__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT results__check__serial CHECK ("serial" >= 0),

  CONSTRAINT results__check__result CHECK ("result"::text ~ '^{'),
  CONSTRAINT results__check__steps CHECK ("steps"::text ~ '^['),

  CONSTRAINT results__fkey__user
    FOREIGN KEY ("user")
    REFERENCES users("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

-- Check unique indexes
CREATE UNIQUE INDEX results__idx__unique_training_and_serial ON results USING btree("training", "serial");

-- Prevent change id
CREATE TRIGGER results__prevent_change_id__trigger
  BEFORE UPDATE ON results FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

-- Scann indexes
CREATE INDEX results__idx__enabled ON results USING btree("enabled");
CREATE INDEX results__idx__deleted ON results USING btree("deleted");
CREATE INDEX results__idx__training ON results USING btree("training");
CREATE INDEX results__idx__trainer ON results USING btree("trainer");
CREATE INDEX results__idx__fkey_user ON results USING btree("user");
