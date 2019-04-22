SET search_path = "$user";

CREATE TYPE public.trainers_data_question__type AS ENUM (
  'close', -- Выбрать наиболее близкое
  'text',  -- Вопрос к тексту
  'waste'  -- Убрать лишнее
);

CREATE TABLE private.trainers_data_questions (
  "id"       uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled"  boolean NOT NULL DEFAULT TRUE,
  "deleted"  boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_data_question__type NOT NULL,

  "body"  text  NOT NULL,
  "items" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainers_data_questions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_data_questions AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."type" as "type",
    t."body" as "body",
    t."items" as "items"

  FROM private.trainers_data_questions t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_data_questions TO api;
