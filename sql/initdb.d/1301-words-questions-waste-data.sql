SET search_path = "$user";

-- DROP TABLE trainer.words_questions_waste_data CASCADE;
CREATE TABLE trainer.words_questions_waste_data (
  "id" integer NOT NULL,

  "items" jsonb[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT words_questions_waste_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT words_questions_waste_data__check__id CHECK ("id" >= 0),

  CONSTRAINT words_questions_waste_data__check__items CHECK (array_length("items", 1) > 0)
);

-- DROP SEQUENCE trainer.words_questions_waste_data_id CASCADE;
CREATE SEQUENCE trainer.words_questions_waste_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.words_questions_waste_data.id;

ALTER TABLE ONLY trainer.words_questions_waste_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.words_questions_waste_data_id'::regclass);

CREATE INDEX words_questions_waste_data__idx__enabled_deleted
  ON trainer.words_questions_waste_data USING btree ("enabled", "deleted");
