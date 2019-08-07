SET search_path = "$user";

-- DROP TABLE trainer.image_differences_data CASCADE;
CREATE TABLE trainer.image_differences_data (
  "imageA" smallint NOT NULL,
  "imageB" smallint NOT NULL,
  "differences" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT image_differences_data__pkey PRIMARY KEY ("imageA", "imageB"),

  CONSTRAINT image_differences_data__check__imageA CHECK ("imageA" > 0),
  CONSTRAINT image_differences_data__check__imageB CHECK ("imageB" > 0),
  CONSTRAINT image_differences_data__check__imageA_imageB CHECK ("imageA" <> "imageB"),

  CONSTRAINT image_differences_data__check__differences
    CHECK (jsonb_typeof("differences") = 'array' AND jsonb_array_length("differences") > 0)
);

CREATE INDEX image_differences_data__idx__enabled_deleted
  ON trainer.image_differences_data USING btree ("enabled", "deleted");
