SET search_path = "$user";

-- DROP TABLE  trainer.image_carpets_data CASCADE;
CREATE TABLE trainer.image_carpets_data (
  "id" integer NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  "complexity" smallint NOT NULL DEFAULT 1,
  "value" jsonb NOT NULL,

  "maxColor" smallint NOT NULL,

  CONSTRAINT image_carpets_data__pkey PRIMARY KEY ("id"),

  CONSTRAINT image_carpets_data__check__complexity CHECK ("complexity" > 0),

  CONSTRAINT image_carpets_data__check__value CHECK (jsonb_typeof("value") = 'object'),
  CONSTRAINT image_carpets_data__check__value_width CHECK (("value"->'width')::int > 0),
  CONSTRAINT image_carpets_data__check__value_height CHECK (("value"->'height')::int > 0),
  CONSTRAINT image_carpets_data__check__value_items
    CHECK (jsonb_typeof("value"->'items') = 'array' AND jsonb_array_length("value"->'items') > 0)
);

-- DROP SEQUENCE trainer.image_carpets_data_id CASCADE;
CREATE SEQUENCE trainer.image_carpets_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.image_carpets_data.id;

ALTER TABLE ONLY trainer.image_carpets_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.image_carpets_data_id'::regclass);

CREATE INDEX image_carpets_data__idx__enabled_deleted
  ON trainer.image_carpets_data USING btree ("enabled", "deleted");

CREATE INDEX image_carpets_data__idx__complexity
  ON trainer.image_carpets_data USING btree ("complexity");

CREATE OR REPLACE FUNCTION trainer.image_carpets_data__trigger__max_color() RETURNS trigger AS $$
BEGIN
  SELECT MAX((items->'color')::int)
  INTO STRICT NEW."maxColor"
  FROM jsonb_array_elements(NEW."value"->'items') AS items;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER max_color BEFORE INSERT OR UPDATE ON trainer.image_carpets_data FOR EACH ROW
  EXECUTE PROCEDURE trainer.image_carpets_data__trigger__max_color();
