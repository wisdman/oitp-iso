SET search_path = "$user";

-- DROP TABLE trainer.storytelling_data CASCADE;
CREATE TABLE trainer.storytelling_data (
  "id" integer NOT NULL,
  "questions" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT storytelling_data__pkey PRIMARY KEY ("id"),
  CONSTRAINT storytelling_data__check__id CHECK ("id" >= 0),

  CONSTRAINT storytelling_data__check__questions
    CHECK (jsonb_typeof("questions") = 'array' AND jsonb_array_length("questions") > 0)
);

CREATE INDEX storytelling_data__idx__enabled_deleted
  ON trainer.storytelling_data USING btree ("enabled", "deleted");
