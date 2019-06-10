SET search_path = "$user";

CREATE TYPE public.trainer__type AS ENUM (
  'classification-colors',      -- Активизация лексиклна
  'classification-definitions', -- Активизация лексиклна
  'classification-words',       -- Активизация лексиклна
  'image-carpets',              -- Наглядно-образная память
  'image-differences',          -- Наглядно-образная память
  'image-expressions',          -- Гармонизация работы полушарий
  'image-fields',               -- Скорость зрительного восприятия
  'math-equation',              -- Арифметико-практическое мышление
  'math-middle',                -- Арифметико-практическое мышление
  'math-sequence',              -- Арифметико-практическое мышление
  'math-waste',                 -- Арифметико-практическое мышление
  'matrix-filling-pattern',     -- Индуктивность
  'matrix-filling-unique',      -- Мнемотехника
  'matrix-sequence-pattern',    -- Индуктивность мышления
  'matrix-sequence-random',     -- Таблицы с произвольным рассположением чисел
  'relax',                      -- Расслабление
  'space-waste-2d',             -- Пространство и логика
  'space-waste-3d',             -- Пространство и логика
  'storytelling',               -- Слуховая память
  'table-pipe-en',              -- Распределение внимания
  'table-pipe-number',          -- Распределение внимания
  'table-pipe-ru',              -- Распределение внимания
  'table-words',                -- Вариативность мышления
  'text-letters',               -- Точность восприятия - афоризмы
  'text-reading',               -- Точность восприятия - тексты
  'text-tezirovanie',           -- Тезирование
  'words-column',               -- Мнемотехника. Столбики
  'words-lexis-antonyms',       -- Вербальный интеллект
  'words-lexis-paronyms',       -- Вербальный интеллект
  'words-lexis-synonyms',       -- Вербальный интеллект
  'words-pairs',                -- Точность восприятия - Столбики
  'words-questions-close',      -- Активизация лексикона
  'words-questions-waste'       -- Вербальный интеллект
);