SET search_path = "$user";

CREATE TYPE public.trainers_text AS ENUM (
  'expression', -- Выражения и цытаты
  'reading',    -- Рассказ и вопросы
  'relax',      -- Расслабление
  'tezirovanie' -- Тезирование
);

CREATE TABLE private.trainers_texts (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_text NOT NULL,
  "data"    text    NOT NULL,
  "author"  text    NOT NULL DEFAULT '',

  CONSTRAINT trainers_texts__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_texts__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_texts.id;

ALTER TABLE ONLY private.trainers_texts ALTER COLUMN id
SET DEFAULT nextval('private.trainers_texts__id__seq'::regclass);

CREATE TABLE private.trainers_texts_questions (
  "text_id"     integer NOT NULL,
  "question_id" integer NOT NULL,

  CONSTRAINT trainers_texts_questions__idx__pkey PRIMARY KEY ("text_id", "question_id"),

  CONSTRAINT trainers_texts_questions__fkey__texts
    FOREIGN KEY ("text_id")
    REFERENCES private.trainers_texts("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT trainers_texts_questions__fkey__questions
    FOREIGN KEY ("question_id")
    REFERENCES private.trainers_questions("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_texts AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."type" as "type",
    t."data" as "data",

    COALESCE(
      json_agg(
        json_build_object(
          'type', q."type",
          'body', q.body,
          'items', q.items
        )
      ) FILTER (WHERE q."id" IS NOT NULL),
      '[]'
    ) AS "questions"

  FROM private.trainers_texts t
  LEFT JOIN private.trainers_texts_questions r ON r."text_id" = t."id"
  LEFT JOIN private.trainers_questions q ON r."question_id" = q."id"
  WHERE NOT t."deleted"
  GROUP BY t."id";

GRANT SELECT ON public.trainers_texts TO api;
