-- DROP TABLE trainer.text_letters_data CASCADE;
CREATE TABLE trainer.text_letters_data (
  "id" integer NOT NULL,

  "expression" text NOT NULL,
  "author" text NOT NULL DEFAULT '',

  "length" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "public" bool NOT NULL DEFAULT TRUE,
  "trainer" bool NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__text_letters_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__text_letters_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__text_letters_data__check__expression CHECK (char_length("expression") > 0),
  CONSTRAINT trainer__text_letters_data__check__length CHECK ("length" > 0),
  CONSTRAINT trainer__text_letters_data__check__runes CHECK (array_length("runes", 1) > 0)
);

SELECT private.init_trash_scope('trainer.text_letters_data');

-- DROP SEQUENCE trainer.text_letters_data_id CASCADE;
CREATE SEQUENCE trainer.text_letters_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.text_letters_data.id;

ALTER TABLE ONLY trainer.text_letters_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.text_letters_data_id'::regclass);

CREATE INDEX trainer__text_letters_data__idx__enabled_public_trainer
  ON trainer.text_letters_data USING btree ("enabled", "public", "trainer");

CREATE INDEX trainer__text_letters_data__idx__length
  ON trainer.text_letters_data USING btree ("length");

CREATE OR REPLACE FUNCTION trainer.text_letters_data__trigger__length_and_runes() RETURNS trigger AS $$
DECLARE
  words text[] := regexp_split_to_array(trim(NEW."expression"), E'\\W+');
BEGIN
  NEW."length" := array_length(words, 1);
  NEW."runes" := (SELECT array_agg(upper(left(c, 1))::char) FROM unnest(words) AS c);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER length_and_runes
  BEFORE INSERT OR UPDATE ON trainer.text_letters_data FOR EACH ROW
  EXECUTE PROCEDURE trainer.text_letters_data__trigger__length_and_runes();
