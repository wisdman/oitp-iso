SET search_path = "$user";

CREATE TYPE public.trainer__type AS ENUM (
  'classification-colors',      -- Активизация лексиклна - цвета
  'classification-definitions', -- Активизация лексиклна - дифиниции
  'classification-words',       -- Активизация лексиклна - слова по группам
  'image-carpets',              -- Наглядно-образная память - коврики
  'image-differences',          -- Наглядно-образная память - поиск отличий
  'image-expressions',          -- Гармонизация работы полушарий - картинка с текстом
  'image-fields',               -- Скорость зрительного восприятия - запоминание картинок
  'math-equation',              -- Арифметико-практическое мышление - формулы
  'math-middle',                -- Арифметико-практическое мышление - скобки
  'math-sequence',              -- Арифметико-практическое мышление - последовательности
  'math-waste',                 -- Арифметико-практическое мышление - лишнее
  'matrix-filling-pattern',     -- Индуктивность - паттерны
  'matrix-filling-unique',      -- Мнемотехника - уникальные
  'matrix-sequence-pattern',    -- Индуктивность мышления - числовые паттерны
  'matrix-sequence-random',     -- Таблицы с произвольным рассположением чисел
  'relax',                      -- Расслабление
  'space-waste-2d',             -- Пространство и логика - лишняя фигура 2d
  'space-waste-3d',             -- Пространство и логика - лишняя фигура 3d
  'storytelling',               -- Слуховая память - уадиорассказы
  'table-pipe',                 -- Распределение внимания
  'text-letters',               -- Точность восприятия - афоризмы
  'text-reading',               -- Точность восприятия - тексты
  'text-tezirovanie',           -- Тезирование
  'words-column',               -- Мнемотехника - столбики
  'words-filling',              -- Вариативность мышления - существительные
  'words-lexis-antonyms',       -- Вербальный интеллект - антонимы
  'words-lexis-paronyms',       -- Вербальный интеллект - паронимы
  'words-lexis-synonyms',       -- Вербальный интеллект - синонимы
  'words-pairs',                -- Точность восприятия - пары слов
  'words-questions-close',      -- Активизация лексикона - Слово это ...
  'words-questions-waste'       -- Вербальный интеллект - лишнее слово
);

CREATE TYPE public.trainer__ui AS ENUM (
  'classification-colors',      -- Активизация лексиклна - цвета
  'classification-definitions', -- Активизация лексиклна - дифиниции
  'classification-words',       -- Активизация лексиклна - слова по группам
  'image-carpets',              -- Коврики - составление
  'image-differences',          -- Поиск отличий - составление
  'image-differences-preview',  -- Поиск отличий - показ
  'image-expressions',          -- Картинка с текстом - вопрос
  'image-expressions-preview',  -- Картинка с текстом - показ
  'image-fields-preview',       -- Запоминание картинок - показ
  'image-fields-question',      -- Запоминание картинок - вопрос
  'math-equation',              -- Арифметико-практическое мышление - формулы
  'math-middle',                -- Арифметико-практическое мышление - скобки
  'math-sequence',              -- Арифметико-практическое мышление - последовательности
  'math-waste',                 -- Арифметико-практическое мышление - лишнее
  'matrix-images-filling',      -- Матрицы с картинками - заполнение
  'matrix-images-preview',      -- Матрицы с картинками - показ
  'matrix-images-question',     -- Матрицы с картинками - вопрос
  'matrix-sequence-filling',    -- Числовые таблицы - восстановление
  'matrix-sequence-play',       -- Числовые таблицы - проход
  'relax',                      -- Расслабление
  'space-question-waste',       -- Лишняя фигура
  'storytelling',               -- Адиорассказ
  'table-pipe',                 -- Распределение внимания
  'text-letters',               -- Афоризмы - заполнение первой буквы
  'text-letters-preview',       -- Афоризмы - показ
  'text-question-tof',          -- Истина или Ложь
  'text-reading',               -- Тексты - чтение
  'text-tezirovanie',           -- Тезирование
  'words-column',               -- Столбики слов - заполнение
  'words-column-preview',       -- Столбики слов - показ
  'words-filling',              -- Заполнение слов
  'words-lexis',                -- Лексические пары
  'words-pairs',                -- Пары слов - заполнение
  'words-pairs-preview',        -- Пары слов - показ
  'words-questions-close',      -- Слово это ...
  'words-questions-waste'       -- Лишнее слово
);

CREATE TYPE public.trainer__group AS ENUM (
  'accuracy',            -- Точность восприятия
  'arithmetic',          -- Арифметико-практическое мышление
  'attention',           -- Распределение внимания
  'auditory-memory',     -- Слуховая память
  'harmonization',       -- Гармонизация работы полушарий
  'inductance',          -- Индуктивность мышления
  'lexicon',             -- Активизация лексикона
  'mnemonics',           -- Мнемотехника
  'numeric-tables',      -- Числовые таблицы
  'space-logic',         -- Пространство и логика
  'teasing',             -- Тезирование
  'variability',         -- Вариативность мышления
  'verbal',              -- Вербальный интеллект
  'visually-memory',     -- Наглядно-образная память
  'visually-perception', -- Скорость зрительного восприятия

  'intelligence',-- Мышление
  'knowledge',   -- Эрудиция
  'memory'       -- Память
);

CREATE TABLE public.trainer_to_group (
  "trainer" public.trainer__type NOT NULL,
  "group"   public.trainer__group NOT NULL,
  CONSTRAINT trainer_to_group__idx__pkey PRIMARY KEY ("trainer", "group")
) WITH (OIDS = FALSE);

GRANT SELECT ON public.trainer_to_group TO "api-public";

INSERT INTO public.trainer_to_group("trainer", "group") VALUES
  ('classification-colors','knowledge'),
  ('classification-colors','lexicon'),
  ('classification-definitions','knowledge'),
  ('classification-definitions','lexicon'),
  ('classification-words','intelligence'),
  ('classification-words','knowledge'),
  ('classification-words','lexicon'),
  ('image-carpets','intelligence'),
  ('image-carpets','memory'),
  ('image-carpets','visually-memory'),
  ('image-differences','memory'),
  ('image-differences','visually-memory'),
  ('image-expressions','harmonization'),
  ('image-expressions','knowledge'),
  ('image-expressions','memory'),
  ('image-fields','memory'),
  ('image-fields','visually-perception'),
  ('math-equation','arithmetic'),
  ('math-equation','intelligence'),
  ('math-middle','arithmetic'),
  ('math-middle','intelligence'),
  ('math-sequence','arithmetic'),
  ('math-sequence','intelligence'),
  ('math-waste','arithmetic'),
  ('math-waste','intelligence'),
  ('matrix-filling-pattern','inductance'),
  ('matrix-filling-pattern','intelligence'),
  ('matrix-filling-pattern','memory'),
  ('matrix-filling-unique','intelligence'),
  ('matrix-filling-unique','memory'),
  ('matrix-filling-unique','mnemonics'),
  ('matrix-sequence-pattern','inductance'),
  ('matrix-sequence-pattern','intelligence'),
  ('matrix-sequence-random','intelligence'),
  ('matrix-sequence-random','numeric-tables'),
  ('space-waste-2d','intelligence'),
  ('space-waste-2d','space-logic'),
  ('space-waste-3d','intelligence'),
  ('space-waste-3d','space-logic'),
  ('storytelling','auditory-memory'),
  ('storytelling','intelligence'),
  ('storytelling','knowledge'),
  ('storytelling','memory'),
  ('table-pipe','attention'),
  ('table-pipe','intelligence'),
  ('text-letters','accuracy'),
  ('text-letters','intelligence'),
  ('text-letters','memory'),
  ('text-reading','accuracy'),
  ('text-reading','intelligence'),
  ('text-reading','knowledge'),
  ('text-reading','memory'),
  ('text-tezirovanie','intelligence'),
  ('text-tezirovanie','knowledge'),
  ('text-tezirovanie','teasing'),
  ('words-column','intelligence'),
  ('words-column','memory'),
  ('words-column','mnemonics'),
  ('words-filling','knowledge'),
  ('words-filling','memory'),
  ('words-filling','variability'),
  ('words-lexis-antonyms','knowledge'),
  ('words-lexis-antonyms','verbal'),
  ('words-lexis-paronyms','intelligence'),
  ('words-lexis-paronyms','knowledge'),
  ('words-lexis-paronyms','verbal'),
  ('words-lexis-synonyms','knowledge'),
  ('words-lexis-synonyms','verbal'),
  ('words-pairs','accuracy'),
  ('words-pairs','intelligence'),
  ('words-pairs','memory'),
  ('words-questions-close','knowledge'),
  ('words-questions-close','lexicon'),
  ('words-questions-waste','intelligence'),
  ('words-questions-waste','knowledge'),
  ('words-questions-waste','verbal');
