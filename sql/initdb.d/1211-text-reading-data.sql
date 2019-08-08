SET search_path = "$user";

-- DROP TABLE trainer.text_reading_data CASCADE;
CREATE TABLE trainer.text_reading_data (
  "id" integer NOT NULL,

  "text" text NOT NULL,
  "questions" jsonb NOT NULL,

  "length" int NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT text_reading_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT text_reading_data__check__id CHECK ("id" >= 0),

  CONSTRAINT text_reading_data__check__text CHECK (char_length("text") > 0),
  CONSTRAINT text_reading_data__check__questions
    CHECK (jsonb_typeof("questions") = 'array' AND jsonb_array_length("questions") > 0),

  CONSTRAINT text_reading_data__check__length CHECK ("length" > 0)
);

-- DROP SEQUENCE trainer.text_reading_data_id CASCADE;
CREATE SEQUENCE trainer.text_reading_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.text_reading_data.id;

ALTER TABLE ONLY trainer.text_reading_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.text_reading_data_id'::regclass);

CREATE INDEX text_reading_data__idx__enabled_deleted
  ON trainer.text_reading_data USING btree ("enabled", "deleted");

CREATE OR REPLACE FUNCTION trainer.text_reading_data__trigger__length() RETURNS trigger AS $$
BEGIN
  NEW."length" := array_length(
    regexp_split_to_array(
      trim(
        regexp_replace(NEW."text", '<[^>]*>', ' ', 'g')
      ), E'\\W+'
    ), 1
  );
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER length
  BEFORE INSERT OR UPDATE ON trainer.text_reading_data FOR EACH ROW
  EXECUTE PROCEDURE trainer.text_reading_data__trigger__length();
