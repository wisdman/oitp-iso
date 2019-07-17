SET search_path = "$user";

CREATE TABLE private.complexity_defaults (
  "trainer" public.trainer__type NOT NULL,

  "previewTimeLimit" smallint NOT NULL DEFAULT 0,
  "timeLimit"        smallint NOT NULL DEFAULT 0,
  "complexity"       smallint NOT NULL DEFAULT 1,

  CONSTRAINT complexity_defaults__idx__pkey PRIMARY KEY ("trainer"),

  CONSTRAINT complexity_defaults__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT complexity_defaults__check__timeLimit CHECK ("timeLimit" >= 0),
  CONSTRAINT complexity_defaults__check__complexity CHECK ("complexity" > 0)

) WITH (OIDS = FALSE);

INSERT INTO private.complexity_defaults("trainer", "previewTimeLimit", "timeLimit", "complexity") VALUES
  ('classification-colors', 0, 10, 1), -- Активизация лексиклна - цвета
  ('classification-definitions', 0, 10, 1), -- Активизация лексиклна - дифиниции
  ('classification-words', 0, 10, 1), -- Активизация лексиклна - слова по группам
  ('image-carpets', 5, 30, 1), -- Наглядно-образная память - коврики
  ('image-differences', 10, 30, 1), -- Наглядно-образная память - поиск отличий
  ('image-expressions', 5, 120, 1), -- Гармонизация работы полушарий - картинка с текстом
  ('image-fields', 5, 2, 1), -- Скорость зрительного восприятия - запоминание картинок
  ('math-equation', 0, 120, 1), -- Арифметико-практическое мышление - формулы
  ('math-middle', 0, 60, 1), -- Арифметико-практическое мышление - скобки
  ('math-sequence', 0, 60, 1), -- Арифметико-практическое мышление - последовательности
  ('math-waste', 0, 10, 1), -- Арифметико-практическое мышление - лишнее
  ('matrix-filling-pattern', 10, 60, 1), -- Индуктивность - паттерны
  ('matrix-filling-unique', 30, 60, 1), -- Мнемотехника - уникальные
  ('matrix-sequence-pattern', 0, 30, 1), -- Индуктивность мышления - числовые паттерны
  ('matrix-sequence-random', 0, 60, 1), -- Таблицы с произвольным рассположением чисел
  ('space-waste-2d', 0, 30, 1), -- Пространство и логика - лишняя фигура 2d
  ('space-waste-3d', 0, 30, 1), -- Пространство и логика - лишняя фигура 3d
  ('storytelling', 0, 30, 1), -- Слуховая память - адиорассказы
  ('table-pipe', 0, 3, 1), -- Распределение внимания
  ('text-letters', 5, 20, 1), -- Точность восприятия - афоризмы
  ('text-reading', 0, 30, 1), -- Точность восприятия - тексты
  ('text-tezirovanie', 0, 60, 1), -- Тезирование
  ('words-column', 3, 10, 1), -- Мнемотехника - столбики
  ('words-filling', 0, 10, 1), -- Вариативность мышления - существительные
  ('words-lexis-antonyms', 0, 10, 1), -- Вербальный интеллект - антонимы
  ('words-lexis-paronyms', 0, 10, 1), -- Вербальный интеллект - паронимы
  ('words-lexis-synonyms', 0, 10, 1),  -- Вербальный интеллект - синонимы
  ('words-pairs', 5, 10, 1), -- Точность восприятия - пары слов
  ('words-questions-close', 0, 30, 1), -- Активизация лексикона - Слово это ...
  ('words-questions-waste', 0, 30, 1); -- Вербальный интеллект - лишнее слово

