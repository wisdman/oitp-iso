-- DROP TABLE trainer.table_pipe_data CASCADE;
CREATE TABLE trainer.table_pipe_data (
  "id" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__table_pipe_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__table_pipe_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__table_pipe_data__check__runes CHECK (array_length("runes", 1) > 0)
);

SELECT private.init_trash_scope('trainer.table_pipe_data');

-- DROP SEQUENCE trainer.table_pipe_data_id CASCADE;
CREATE SEQUENCE trainer.table_pipe_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.table_pipe_data.id;

ALTER TABLE ONLY trainer.table_pipe_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.table_pipe_data_id'::regclass);

CREATE INDEX trainer__table_pipe_data__idx__enabled ON trainer.table_pipe_data USING btree ("enabled");
