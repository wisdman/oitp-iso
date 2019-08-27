-- DROP TABLE trainer.text_tezirovanie_data CASCADE;
CREATE TABLE trainer.text_tezirovanie_data (
  "id" integer NOT NULL,

  "text" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__text_tezirovanie_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__text_tezirovanie_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__text_tezirovanie_data__check__text CHECK (char_length("text") > 0)
);

SELECT private.init_trash_scope('trainer.text_tezirovanie_data');

-- DROP SEQUENCE trainer.text_tezirovanie_data_id CASCADE;
CREATE SEQUENCE trainer.text_tezirovanie_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.text_tezirovanie_data.id;

ALTER TABLE ONLY trainer.text_tezirovanie_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.text_tezirovanie_data_id'::regclass);

CREATE INDEX trainer__text_tezirovanie_data__idx__enabled ON trainer.text_tezirovanie_data USING btree ("enabled");
