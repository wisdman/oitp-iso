SET search_path = "$user";

CREATE TABLE private.complexity_defaults (
  "trainer" public.trainer__type NOT NULL,

  "previewTimeLimit"    smallint NOT NULL DEFAULT 0,
  "playTimeLimit"       smallint NOT NULL DEFAULT 0,

  "complexity" smallint NOT NULL DEFAULT 1,

  CONSTRAINT complexity_defaults__idx__pkey PRIMARY KEY ("trainer"),

  CONSTRAINT complexity_defaults__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT complexity_defaults__check__playTimeLimit CHECK ("playTimeLimit" >= 0),

  CONSTRAINT complexity_defaults__check__complexity CHECK ("complexity" > 0)

) WITH (OIDS = FALSE);

INSERT INTO private.complexity_defaults("trainer", "complexity", "previewTimeLimit", "playTimeLimit") VALUES
  ('classification-colors'      , 1,  0,  10), -- Активизация лексиклна - цвета
  ('classification-definitions' , 1,  0,  10), -- Активизация лексиклна - дифиниции
  ('classification-words'       , 1,  0,  10), -- Активизация лексиклна - слова по группам
  ('image-carpets'              , 1,  5,  30), -- Наглядно-образная память - коврики
  ('image-differences'          , 1, 10,  30), -- Наглядно-образная память - поиск отличий
  ('image-expressions'          , 1,  5, 120), -- Гармонизация работы полушарий - картинка с текстом
  ('image-fields'               , 1,  5,  60), -- Скорость зрительного восприятия - запоминание картинок
  ('math-equation'              , 1,  0, 120), -- Арифметико-практическое мышление - формулы
  ('math-middle'                , 1,  0,  60), -- Арифметико-практическое мышление - скобки
  ('math-sequence'              , 1,  0,  60), -- Арифметико-практическое мышление - последовательности
  ('math-waste'                 , 1,  0,  60), -- Арифметико-практическое мышление - лишнее
  ('matrix-filling-pattern'     , 1, 10,  60), -- Индуктивность - паттерны
  ('matrix-filling-question'    , 1,  0,  60), -- Индуктивность - вопросы к паттернам
  ('matrix-filling-unique'      , 1, 30,  60), -- Мнемотехника - уникальные
  ('matrix-sequence-pattern'    , 1,  0,  30), -- Индуктивность мышления - числовые паттерны
  ('matrix-sequence-random'     , 1,  0,  60), -- Таблицы с произвольным рассположением чисел
  ('space-waste-2d'             , 1,  0,  30), -- Пространство и логика - лишняя фигура 2d
  ('space-waste-3d'             , 1,  0,  30), -- Пространство и логика - лишняя фигура 3d
  ('storytelling'               , 1,  0,  30), -- Слуховая память - адиорассказы
  ('table-pipe'                 , 1,  0,  30), -- Распределение внимания
  ('text-letters'               , 1, 10,  20), -- Точность восприятия - афоризмы
  ('text-reading'               , 1,  0,  30), -- Точность восприятия - тексты
  ('text-tezirovanie'           , 1,  0,  60), -- Тезирование
  ('words-column'               , 1, 30,  60), -- Мнемотехника - столбики
  ('words-filling'              , 1,  0,  60), -- Вариативность мышления - существительные
  ('words-lexis-antonyms'       , 1,  0,  10), -- Вербальный интеллект - антонимы
  ('words-lexis-paronyms'       , 1,  0,  10), -- Вербальный интеллект - паронимы
  ('words-lexis-synonyms'       , 1,  0,  10), -- Вербальный интеллект - синонимы
  ('words-pairs'                , 1, 10,  20), -- Точность восприятия - пары слов
  ('words-questions-close'      , 1,  0,  30), -- Активизация лексикона - Слово это ...
  ('words-questions-waste'      , 1,  0,  30); -- Вербальный интеллект - лишнее слово
