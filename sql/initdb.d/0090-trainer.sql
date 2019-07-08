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
  'space-waste-2d',             -- Пространство и логика - лишняя фигура 2d
  'space-waste-3d',             -- Пространство и логика - лишняя фигура 3d
  'storytelling',               -- Слуховая память - уадиорассказы
  'table-pipe-en',              -- Распределение внимания - английские буквы
  'table-pipe-number',          -- Распределение внимания - числа
  'table-pipe-ru',              -- Распределение внимания - русские буквы
  'table-words',                -- Вариативность мышления - существительные
  'text-letters',               -- Точность восприятия - афоризмы
  'text-reading',               -- Точность восприятия - тексты
  'text-tezirovanie',           -- Тезирование
  'words-column',               -- Мнемотехника - столбики
  'words-lexis-antonyms',       -- Вербальный интеллект - антонимы
  'words-lexis-paronyms',       -- Вербальный интеллект - паронимы
  'words-lexis-synonyms',       -- Вербальный интеллект - синонимы
  'words-pairs',                -- Точность восприятия - пары слов
  'words-questions-close',      -- Активизация лексикона - Слово это ...
  'words-questions-waste'       -- Вербальный интеллект - лишнее слово
);

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
  'numeric-tables',      -- Числовые таблицы

  'memory',      -- Память
  'knowledge',   -- Эрудиция
  'intelligence' -- Мышление
);

CREATE TABLE public.trainer_to_group (
  "trainer" public.trainers__type NOT NULL,
  "group"   public.trainers__group NOT NULL,
  CONSTRAINT trainer_to_group__idx__pkey PRIMARY KEY ("trainer", "group")
) WITH (OIDS = FALSE);

GRANT SELECT ON public.trainer_to_group TO "api-public";

INSERT INTO public.trainer_to_group("trainer", "group") VALUES
  ('classification-colors','lexicon'),
  ('classification-colors','knowledge'),
  ('classification-definitions','lexicon'),
  ('classification-definitions','knowledge'),
  ('classification-words','lexicon'),
  ('classification-words','knowledge'),
  ('classification-words','intelligence'),
  ('image-carpets','visually-memory'),
  ('image-carpets','memory'),
  ('image-carpets','intelligence'),
  ('image-differences','visually-memory'),
  ('image-differences','memory'),
  ('image-expressions','harmonization'),
  ('image-expressions','memory'),
  ('image-expressions','knowledge'),
  ('image-fields','visually-perception'),
  ('image-fields','memory'),
  ('math-equation','arithmetic'),
  ('math-equation','intelligence'),
  ('math-middle','arithmetic'),
  ('math-middle','intelligence'),
  ('math-sequence','arithmetic'),
  ('math-sequence','intelligence'),
  ('math-waste','arithmetic'),
  ('math-waste','intelligence'),
  ('matrix-filling-pattern','inductance'),
  ('matrix-filling-pattern','memory'),
  ('matrix-filling-pattern','intelligence'),
  ('matrix-filling-unique','mnemonics'),
  ('matrix-filling-unique','memory'),
  ('matrix-filling-unique','intelligence'),
  ('matrix-sequence-pattern','inductance'),
  ('matrix-sequence-pattern','intelligence'),
  ('matrix-sequence-random','numeric-tables'),
  ('matrix-sequence-random','intelligence'),
  ('space-waste-2d','space-logic'),
  ('space-waste-2d','intelligence'),
  ('space-waste-3d','space-logic'),
  ('space-waste-3d','intelligence'),
  ('storytelling','auditory-memory'),
  ('storytelling','memory'),
  ('storytelling','knowledge'),
  ('storytelling','intelligence'),
  ('table-pipe-en','attention'),
  ('table-pipe-en','intelligence'),
  ('table-pipe-number','attention'),
  ('table-pipe-number','intelligence'),
  ('table-pipe-ru','attention'),
  ('table-pipe-ru','intelligence'),
  ('table-words','variability'),
  ('table-words','memory'),
  ('table-words','knowledge'),
  ('text-letters','accuracy'),
  ('text-letters','memory'),
  ('text-letters','intelligence'),
  ('text-reading','accuracy'),
  ('text-reading','memory'),
  ('text-reading','knowledge'),
  ('text-reading','intelligence'),
  ('text-tezirovanie','teasing'),
  ('text-tezirovanie','knowledge'),
  ('text-tezirovanie','intelligence'),
  ('words-column','mnemonics'),
  ('words-column','memory'),
  ('words-column','intelligence'),
  ('words-lexis-antonyms','verbal'),
  ('words-lexis-antonyms','knowledge'),
  ('words-lexis-paronyms','verbal'),
  ('words-lexis-paronyms','knowledge'),
  ('words-lexis-paronyms','intelligence'),
  ('words-lexis-synonyms','verbal'),
  ('words-lexis-synonyms','knowledge'),
  ('words-pairs','accuracy'),
  ('words-pairs','memory'),
  ('words-pairs','intelligence'),
  ('words-questions-close','lexicon'),
  ('words-questions-close','knowledge'),
  ('words-questions-waste','verbal'),
  ('words-questions-waste','knowledge'),
  ('words-questions-waste','intelligence');

CREATE TYPE public.trainer__ui AS ENUM (
  'classification-colors',      -- Активизация лексиклна - цвета
  'classification-definitions', -- Активизация лексиклна - дифиниции
  'classification-words',       -- Активизация лексиклна - слова по группам
  'image-carpets',              -- Коврики - составление
  'image-carpets-preview',      -- Коврики - показ
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
  'matrix-images-question',     -- Матрицы с картинками - вопрос
  'matrix-images-preview',      -- Матрицы с картинками - показ
  'matrix-sequence-filling',    -- Числовые таблицы - восстановление
  'matrix-sequence-play',       -- Числовые таблицы - проход
  'matrix-sequence-preview',    -- Числовые таблицы - показ
  'relax',                      -- Расслабление
  'space-question-waste',       -- Лишняя фигура
  'storytelling',               -- Адиорассказ
  'table-pipe',                 -- Распределение внимания
  'text-letters',               -- Афоризмы - заполнение первой буквы
  'text-letters-preview',       -- Афоризмы - показ
  'text-question',              -- Текстовый вопрос
  'text-reading',               -- Тексты - чтение
  'text-tezirovanie',           -- Тезирование
  'words-column',               -- Столбики слов - заполнение
  'words-column-preview',       -- Столбики слов - показ
  'words-filling',              -- Заполнение слов
  'words-lexis-antonyms',       -- Антонимы
  'words-lexis-paronyms',       -- Паронимы
  'words-lexis-synonyms',       -- Синонимы
  'words-pairs',                -- Пары слов - заполнение
  'words-pairs-preview',        -- Пары слов - показ
  'words-questions-close',      -- Слово это ...
  'words-questions-waste'       -- Лишнее слово
);
