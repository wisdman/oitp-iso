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
  'accuracy'             -- Точность восприятия
);




