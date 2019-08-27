-- DROP TABLE trainer.matrix_filling_pattern_data CASCADE;
CREATE TABLE trainer.matrix_filling_pattern_data (
  "id" integer NOT NULL,
  "data" smallint[] NOT NULL,

  "size" smallint NOT NULL,
  "items" smallint NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__matrix_filling_pattern_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__matrix_filling_pattern_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__matrix_filling_pattern_data__check__data CHECK (array_length("data", 1) > 0),

  CONSTRAINT trainer__matrix_filling_pattern_data__check__size CHECK ("size" > 0),
  CONSTRAINT trainer__matrix_filling_pattern_data__check__items CHECK ("items" > 0)
);

SELECT private.init_trash_scope('trainer.matrix_filling_pattern_data');

-- DROP SEQUENCE trainer.matrix_filling_pattern_data_id CASCADE;
CREATE SEQUENCE trainer.matrix_filling_pattern_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.matrix_filling_pattern_data.id;

ALTER TABLE ONLY trainer.matrix_filling_pattern_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.matrix_filling_pattern_data_id'::regclass);

CREATE INDEX trainer__matrix_filling_pattern_data__idx__enabled
  ON trainer.matrix_filling_pattern_data USING btree ("enabled");

CREATE INDEX trainer__matrix_filling_pattern_data__idx__size
  ON trainer.matrix_filling_pattern_data USING btree ("size");

CREATE INDEX trainer__matrix_filling_pattern_data__idx__items
  ON trainer.matrix_filling_pattern_data USING btree ("items");

CREATE OR REPLACE FUNCTION trainer.matrix_filling_pattern_data__trigger__size_and_items() RETURNS trigger AS $$
BEGIN
  NEW."size" = array_length(NEW."data", 1);
  NEW."items" = array_length(ARRAY(SELECT DISTINCT unnest(NEW."data")), 1);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER size_and_items
  BEFORE INSERT OR UPDATE ON trainer.matrix_filling_pattern_data FOR EACH ROW
  EXECUTE PROCEDURE trainer.matrix_filling_pattern_data__trigger__size_and_items();
