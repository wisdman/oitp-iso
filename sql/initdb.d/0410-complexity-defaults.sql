SET search_path = "$user";

-- DROP TABLE private.complexity_defaults CASCADE;
CREATE TABLE private.complexity_defaults (
  "trainer" public.trainer_type NOT NULL,

  "complexity" smallint NOT NULL DEFAULT 1,

  "previewTimeLimit" int NOT NULL DEFAULT 0,
  "playTimeLimit"    int NOT NULL DEFAULT 0,

  CONSTRAINT complexity_defaults__pkey PRIMARY KEY ("trainer"),

  CONSTRAINT complexity_defaults__check__complexity CHECK ("complexity" > 0),
  CONSTRAINT complexity_defaults__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT complexity_defaults__check__playTimeLimit CHECK ("playTimeLimit" >= 0)
);

INSERT INTO private.complexity_defaults("trainer", "complexity", "previewTimeLimit", "playTimeLimit") VALUES
  ('classification-colors'      , 1,     0,  10000), -- Активизация лексиклна - цвета
  ('classification-definitions' , 1,     0,  10000), -- Активизация лексиклна - дифиниции
  ('classification-words'       , 1,     0,  10000), -- Активизация лексиклна - слова по группам
  ('image-carpets'              , 1,  5000,  30000), -- Наглядно-образная память - коврики
  ('image-differences'          , 1, 10000,  30000), -- Наглядно-образная память - поиск отличий
  ('image-expressions'          , 1,  5000, 120000), -- Гармонизация работы полушарий - картинка с текстом
  ('image-fields'               , 1,  5000,  60000), -- Скорость зрительного восприятия - запоминание картинок
  ('math-equation'              , 1,     0, 120000), -- Арифметико-практическое мышление - формулы
  ('math-middle'                , 1,     0,  60000), -- Арифметико-практическое мышление - скобки
  ('math-sequence'              , 1,     0,  60000), -- Арифметико-практическое мышление - последовательности
  ('math-waste'                 , 1,     0,  60000), -- Арифметико-практическое мышление - лишнее
  ('matrix-filling-pattern'     , 1, 10000,  60000), -- Индуктивность - паттерны
  ('matrix-filling-question'    , 1,     0,  60000), -- Индуктивность - вопросы к паттернам
  ('matrix-filling-unique'      , 1, 30000,  60000), -- Мнемотехника - уникальные
  ('matrix-sequence-pattern'    , 1,     0,  30000), -- Индуктивность мышления - числовые паттерны
  ('matrix-sequence-random'     , 1,     0,  60000), -- Таблицы с произвольным рассположением чисел
  ('space-waste-2d'             , 1,     0,  30000), -- Пространство и логика - лишняя фигура 2d
  ('space-waste-3d'             , 1,     0,  30000), -- Пространство и логика - лишняя фигура 3d
  ('storytelling'               , 1,     0,  30000), -- Слуховая память - адиорассказы
  ('table-pipe'                 , 1,     0,  30000), -- Распределение внимания
  ('text-letters'               , 1, 10000,  20000), -- Точность восприятия - афоризмы
  ('text-reading'               , 1,     0,  30000), -- Точность восприятия - тексты
  ('text-tezirovanie'           , 1,     0,  60000), -- Тезирование
  ('words-column'               , 1, 30000,  60000), -- Мнемотехника - столбики
  ('words-filling'              , 1,     0,  60000), -- Вариативность мышления - существительные
  ('words-lexis-antonyms'       , 1,     0,  10000), -- Вербальный интеллект - антонимы
  ('words-lexis-paronyms'       , 1,     0,  10000), -- Вербальный интеллект - паронимы
  ('words-lexis-synonyms'       , 1,     0,  10000), -- Вербальный интеллект - синонимы
  ('words-pairs'                , 1, 10000,  20000), -- Точность восприятия - пары слов
  ('words-questions-close'      , 1,     0,  30000), -- Активизация лексикона - Слово это ...
  ('words-questions-waste'      , 1,     0,  30000); -- Вербальный интеллект - лишнее слово
