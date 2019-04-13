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
  "multiple" boolean NOT NULL DEFAULT FALSE,
  "question" text    NOT NULL,
  "answers"  jsonb   NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainers_data_questions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);