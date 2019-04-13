SET search_path = "$user";

CREATE TYPE public.trainers_data_texts__type AS ENUM (
  'accuracy',   -- Точность
  'expression', -- Выражения и цытаты
  'story',      -- Рассказ
  'tezirovanie' -- Тезирование
);

CREATE TABLE private.trainers_data_texts (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_data_texts__type NOT NULL,
  "data"    text    NOT NULL,
  "author"  text    NOT NULL DEFAULT '',

  CONSTRAINT trainers_data_texts__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE private.trainers_data_texts_questions (
  "text_id"     uuid NOT NULL,
  "question_id" uuid NOT NULL,

  CONSTRAINT trainers_data_texts_questions__idx__pkey PRIMARY KEY ("text_id", "question_id"),

  CONSTRAINT trainers_data_texts_questions__fkey__texts
    FOREIGN KEY ("text_id")
    REFERENCES private.trainers_data_texts("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT trainers_data_texts_questions__fkey__questions
    FOREIGN KEY ("question_id")
    REFERENCES private.trainers_data_questions("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);