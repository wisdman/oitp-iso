SET search_path = "$user";

CREATE TYPE public.trainer__group AS ENUM (
  'lexicon',             -- Активизация лексикона
  'arithmetic',          -- Арифметико-практическое мышление
  'variability',         -- Вариативность мышления
  'verbal',              -- Вербальный интеллект
  'harmonization',       -- Гармонизация работы полушарий
  'inductance',          -- Индуктивность мышления
  'mnemonics',           -- Мнемотехника
  'visually-memory',     -- Наглядно-образная память
  'space-logic',         -- Пространство и логика
  'attention',           -- Распределение внимания
  'visually-perception', -- Скорость зрительного восприятия
  'auditory-memory',     -- Слуховая память
  'teasing',             -- Тезирование
  'accuracy',            -- Точность восприятия
  'numeric-tables'      -- Числовые таблицы
);

CREATE TABLE public.trainer_to_group (
  "trainer" public.trainer__type NOT NULL,
  "group" public.trainer__group NOT NULL,
  CONSTRAINT trainer_to_group__idx__pkey PRIMARY KEY ("trainer", "group")
) WITH (OIDS = FALSE);

GRANT SELECT ON public.trainer_to_group TO "api-public";

INSERT INTO public.trainer_to_group("trainer", "group") VALUES
  ('classification-colors','lexicon'),
  ('classification-definitions','lexicon'),
  ('classification-words','lexicon'),
  ('image-carpets','visually-memory'),
  ('image-differences','visually-memory'),
  ('image-expressions','harmonization'),
  ('image-fields','visually-perception'),
  ('math-equation','arithmetic'),
  ('math-middle','arithmetic'),
  ('math-sequence','arithmetic'),
  ('math-waste','arithmetic'),
  ('matrix-filling-pattern','inductance'),
  ('matrix-filling-unique','mnemonics'),
  ('matrix-sequence-pattern','inductance'),
  ('matrix-sequence-random','numeric-tables'),
  ('space-waste-2d','space-logic'),
  ('space-waste-3d','space-logic'),
  ('storytelling','auditory-memory'),
  ('table-pipe-en','attention'),
  ('table-pipe-number','attention'),
  ('table-pipe-ru','attention'),
  ('table-words','variability'),
  ('text-letters','accuracy'),
  ('text-reading','accuracy'),
  ('text-tezirovanie','teasing'),
  ('words-column','mnemonics'),
  ('words-lexis-antonyms','verbal'),
  ('words-lexis-paronyms','verbal'),
  ('words-lexis-synonyms','verbal'),
  ('words-pairs','accuracy'),
  ('words-questions-close','lexicon'),
  ('words-questions-waste','verbal');