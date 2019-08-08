SET search_path = "$user";

-- DROP TABLE trainer.table_pipe_data CASCADE;
CREATE TABLE trainer.table_pipe_data (
  "id" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT table_pipe_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT table_pipe_data__check__id CHECK ("id" >= 0),

  CONSTRAINT table_pipe_data__check__runes CHECK (array_length("runes", 1) > 0)
);

-- DROP SEQUENCE trainer.table_pipe_data_id CASCADE;
CREATE SEQUENCE trainer.table_pipe_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.table_pipe_data.id;

ALTER TABLE ONLY trainer.table_pipe_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.table_pipe_data_id'::regclass);

CREATE INDEX table_pipe_data__idx__enabled_deleted
  ON trainer.table_pipe_data USING btree ("enabled", "deleted");
