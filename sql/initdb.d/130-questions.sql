SET search_path = "$user";

CREATE TYPE public.trainers_question AS ENUM (
  'text',  -- Вопрос к тексту
  'words-close', -- Выбрать наиболее близкое слово
  'words-waste' -- Убрать лишнее слово
);

CREATE TABLE private.trainers_questions (
  "id"       integer NOT NULL,
  "enabled"  boolean NOT NULL DEFAULT TRUE,
  "deleted"  boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_question NOT NULL,

  "body"  text  NOT NULL,
  "items" jsonb NOT NULL DEFAULT '[]'::jsonb,

  CONSTRAINT trainers_questions__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainers_questions__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_questions.id;

ALTER TABLE ONLY private.trainers_questions ALTER COLUMN id
SET DEFAULT nextval('private.trainers_questions__id__seq'::regclass);

CREATE VIEW public.trainers_questions AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."type" as "type",
    t."body" as "body",
    t."items" as "items"

  FROM private.trainers_questions t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_questions TO api;
