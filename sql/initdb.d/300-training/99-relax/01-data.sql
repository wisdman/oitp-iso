-- DROP TABLE trainer.relax_data CASCADE;
CREATE TABLE trainer.relax_data (
  "id" integer NOT NULL,

  "expression" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__relax_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__relax_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__relax_data__check__expression CHECK (char_length("expression") > 0)
);

SELECT private.init_trash_scope('trainer.relax_data');

-- DROP SEQUENCE trainer.relax_data_id CASCADE;
CREATE SEQUENCE trainer.relax_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.relax_data.id;

ALTER TABLE ONLY trainer.relax_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.relax_data_id'::regclass);

CREATE INDEX trainer__relax_data__idx__enabled ON trainer.relax_data USING btree ("enabled");
