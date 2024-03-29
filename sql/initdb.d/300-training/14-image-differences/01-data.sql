-- DROP TABLE trainer.image_differences_data CASCADE;
CREATE TABLE trainer.image_differences_data (
  "id" integer NOT NULL,

  "imageA" smallint NOT NULL,
  "imageB" smallint NOT NULL,
  "differences" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT trainer__image_differences_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__image_differences_data__check__id CHECK ("id" >= 0),

  CONSTRAINT trainer__image_differences_data__check__imageA CHECK ("imageA" > 0),
  CONSTRAINT trainer__image_differences_data__check__imageB CHECK ("imageB" > 0),
  CONSTRAINT trainer__image_differences_data__check__imageA_imageB CHECK ("imageA" <> "imageB"),

  CONSTRAINT trainer__image_differences_data__check__differences
    CHECK (jsonb_typeof("differences") = 'array' AND jsonb_array_length("differences") > 0)
);

SELECT private.init_trash_scope('trainer.image_differences_data');

-- DROP SEQUENCE trainer.image_differences_data_id CASCADE;
CREATE SEQUENCE trainer.image_differences_data_id AS integer
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY trainer.image_differences_data.id;

ALTER TABLE ONLY trainer.image_differences_data
  ALTER COLUMN id SET DEFAULT nextval('trainer.image_differences_data_id'::regclass);

CREATE UNIQUE INDEX trainer__image_differences_data__unique_idx__imageA_imageB
  ON trainer.image_differences_data USING btree ("imageA", "imageB");

CREATE INDEX trainer__image_differences_data__idx__enabled
  ON trainer.image_differences_data USING btree ("enabled");
