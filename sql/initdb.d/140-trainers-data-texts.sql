SET search_path = "$user";

CREATE TYPE public.trainers_data_texts__type AS ENUM (
  'expression', -- Выражения и цытаты
  'reading',    -- Рассказ и вопросы
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


CREATE VIEW public.trainers_data_texts AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."type" as "type",
    t."data" as "data",

    COALESCE(
      json_agg(
        json_build_object(
          'itemsType', q."type",
          'data', q.body,
          'items', q.items
        )
      ) FILTER (WHERE q."id" IS NOT NULL),
      '[]'
    ) AS "questions"

  FROM private.trainers_data_texts t
  LEFT JOIN private.trainers_data_texts_questions r ON r."text_id" = t."id"
  LEFT JOIN private.trainers_data_questions q ON r."question_id" = q."id"
  WHERE NOT t."deleted"
  GROUP BY t."id";

GRANT SELECT ON public.trainers_data_texts TO api;
