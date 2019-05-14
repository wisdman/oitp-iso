SET search_path = "$user";

CREATE TYPE public.trainers__type AS ENUM (
  'classification-colors', -- Классификация цветов
  'classification-words', -- Классификация слов
  'image-carpets', -- Коврики
  'image-differences', -- Поиск отличий
  'image-expressions', -- Запомнить фразу к картинке
  'image-fields', -- Запомнить картинки
  'math-middle', -- Среднее число в скобках
  'math-sequence', -- Числовой ряд
  'math-waste', -- Лишнее число
  'math-equation', -- Уравнение
  'matrix-filling-pattern', -- Запомнить таблицу на основе паттерна
  'matrix-filling-random',  -- Запомнить случайную таблицу
  'matrix-filling-unique', -- Запомнить уникальную таблицу
  'matrix-sequence-pattern', -- Числовая таблица на основе паттерна
  'matrix-sequence-random', -- Случайная числовая таблица
  'space-part', -- Меньшее в большем
  'space-waste-2d', -- Лишняя фигура, 2d поворот
  'space-waste-3d', -- Лишняя фигура, 3d поворот
  'table-pipe', -- Разминка
  'table-words', -- Заполнение таблицы словами
  'text-letters', -- Первые буквы слов фразы
  'text-reading', -- Текст для чтения и вопросы
  'text-tezirovanie', -- Тезирование
  'words-close', -- Выбрать наиболее близкое слово
  'words-column', -- Востановить список слов по памяти
  'words-definition', -- Дифиниции к словам
  'words-pairs', -- Два столбика слов
  'words-pairs-antonyms', -- Два столбика слов, антинимы
  'words-pairs-paronyms', -- Два столбика слов, паронимы
  'words-pairs-synonyms', -- Два столбика слов, синонимы
  'words-waste' -- Выбрать лишнее слово
);

'antonyms', -- Антонимы
  'paronyms', -- Паронимы
  'synonyms'  -- Синонимы

CREATE TABLE private.complexity (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "trainer"    public.trainers__type NOT NULL,
  "complexity" smallint NOT NULL,
  "data"     jsonb    NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT complexity__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT complexity__check__data  CHECK ("data"::text ~ '^{')
) WITH (OIDS = FALSE);

CREATE UNIQUE INDEX complexity__idx__unique_trainer_complexity
ON private.complexity USING btree ("trainer", "complexity");

CREATE VIEW public.complexity AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."trainer" as "trainer",
    t."complexity" as "complexity",
    t."data" as "data"
  FROM private.complexity t
  WHERE NOT t."deleted";

GRANT SELECT ON public.complexity TO api;

-- Default configs
INSERT INTO private.complexity("trainer", "complexity", "data") VALUES
  -- Классификация цветов
  ('classification-colors', 0, '{'
    '"itemTimeLimit":20,'
    '"quantity": 3'
  '}'),
  ('classification-colors', 1, '{'
    '"itemTimeLimit":20,'
    '"quantity": 5'
  '}'),
  ('classification-colors', 2, '{'
    '"itemTimeLimit":15,'
    '"quantity": 5'
  '}'),
  ('classification-colors', 3, '{'
    '"itemTimeLimit":10,'
    '"quantity": 5'
  '}'),
  ('classification-colors', 4, '{'
    '"itemTimeLimit":10,'
    '"quantity": 7'
  '}'),

  -- Классификация слов
  ('classification-words', 0, '{'
    '"itemTimeLimit":10,'
    '"minItems":3,'
    '"maxItems":5,'
    '"quantity": 3'
  '}'),
  ('classification-words', 1, '{'
    '"itemTimeLimit":10,'
    '"minItems":5,'
    '"maxItems":7,'
    '"quantity": 3'
  '}'),
  ('classification-words', 2, '{'
    '"itemTimeLimit":8,'
    '"minItems":5,'
    '"maxItems":7,'
    '"quantity": 3'
  '}'),
  ('classification-words', 3, '{'
    '"itemTimeLimit":8,'
    '"minItems":5,'
    '"maxItems":7,'
    '"quantity": 4'
  '}'),
  ('classification-words', 4, '{'
    '"itemTimeLimit":5,'
    '"minItems":6,'
    '"maxItems":7,'
    '"quantity": 4'
  '}'),

  -- Коврики
  ('image-carpets', 0, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"complexity": 0,'
    '"quantity": 3'
  '}'),
  ('image-carpets', 1, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"complexity": 0,'
    '"quantity": 5'
  '}'),
  ('image-carpets', 2, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"complexity": 1,'
    '"quantity": 5'
  '}'),
  ('image-carpets', 3, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"complexity": 2,'
    '"quantity": 5'
  '}'),
  ('image-carpets', 4, '{'
    '"showTimeLimit":3,'
    '"playTimeLimit":30,'
    '"complexity": 2,'
    '"quantity": 5'
  '}'),

  -- Поиск отличий
  ('image-differences', 0, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":30,'
    '"quantity": 2'
  '}'),
  ('image-differences', 1, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":30,'
    '"quantity": 4'
  '}'),
  ('image-differences', 2, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"quantity": 4'
  '}'),
  ('image-differences', 3, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":20,'
    '"quantity": 4'
  '}'),
  ('image-differences', 4, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":10,'
    '"quantity": 4'
  '}'),

  -- Запомнить фразу к картинке
  ('image-expressions', 0, '{'
    '"showTimeLimit":7,'
    '"playTimeLimit":30,'
    '"quantity": 3'
  '}'),
  ('image-expressions', 1, '{'
    '"showTimeLimit":7,'
    '"playTimeLimit":30,'
    '"quantity": 5'
  '}'),
  ('image-expressions', 2, '{'
    '"showTimeLimit":7,'
    '"playTimeLimit":30,'
    '"quantity": 7'
  '}'),
  ('image-expressions', 3, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":20,'
    '"quantity": 7'
  '}'),
  ('image-expressions', 4, '{'
    '"showTimeLimit":3,'
    '"playTimeLimit":20,'
    '"quantity": 7'
  '}'),

  -- Запомнить картинки
  ('image-fields', 0, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":60,'
    '"minItems":3,'
    '"maxItems":4,'
    '"answersCount":5,'
    '"fakeAnswersCount":2,'
    '"quantity": 3'
  '}'),
  ('image-fields', 1, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":60,'
    '"minItems":3,'
    '"maxItems":4,'
    '"answersCount":5,'
    '"fakeAnswersCount":2,'
    '"quantity": 5'
  '}'),
  ('image-fields', 2, '{'
    '"showTimeLimit":3,'
    '"playTimeLimit":60,'
    '"minItems":4,'
    '"maxItems":5,'
    '"answersCount":10,'
    '"fakeAnswersCount":4,'
    '"quantity": 5'
  '}'),
  ('image-fields', 3, '{'
    '"showTimeLimit":3,'
    '"playTimeLimit":30,'
    '"minItems":4,'
    '"maxItems":5,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('image-fields', 4, '{'
    '"showTimeLimit":3,'
    '"playTimeLimit":30,'
    '"minItems":5,'
    '"maxItems":5,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 7'
  '}'),

  -- Среднее число в скобках
  ('math-middle', 0, '{'
    '"timeLimit":120,'
    '"quantity": 3'
  '}'),
  ('math-middle', 1, '{'
    '"timeLimit":90,'
    '"quantity": 3'
  '}'),
  ('math-middle', 2, '{'
    '"timeLimit":60,'
    '"quantity": 5'
  '}'),
  ('math-middle', 3, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('math-middle', 4, '{'
    '"timeLimit":20,'
    '"quantity": 5'
  '}'),

  -- Числовой ряд
  ('math-sequence', 0, '{'
    '"timeLimit":120,'
    '"quantity": 3'
  '}'),
  ('math-sequence', 1, '{'
    '"timeLimit":90,'
    '"quantity": 3'
  '}'),
  ('math-sequence', 2, '{'
    '"timeLimit":60,'
    '"quantity": 5'
  '}'),
  ('math-sequence', 3, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('math-sequence', 4, '{'
    '"timeLimit":20,'
    '"quantity": 5'
  '}'),

  -- Лишнее число
  ('math-waste', 0, '{'
    '"timeLimit":120,'
    '"quantity": 3'
  '}'),
  ('math-waste', 1, '{'
    '"timeLimit":90,'
    '"quantity": 3'
  '}'),
  ('math-waste', 2, '{'
    '"timeLimit":60,'
    '"quantity": 5'
  '}'),
  ('math-waste', 3, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('math-waste', 4, '{'
    '"timeLimit":20,'
    '"quantity": 5'
  '}'),

  -- Запомнить таблицу на основе паттерна
  ('matrix-filling-pattern', 0, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":3,'
    '"matrixSize":9,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-pattern', 1, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":4,'
    '"matrixSize":16,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-pattern', 2, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":16,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-pattern', 3, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-pattern', 4, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-pattern', 5, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-pattern', 6, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":6,'
    '"matrixSize":36,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-pattern', 7, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":6,'
    '"matrixSize":49,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),

  -- Запомнить случайную таблицу
  ('matrix-filling-random', 0, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":3,'
    '"matrixSize":9,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-random', 1, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":4,'
    '"matrixSize":16,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-random', 2, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":16,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-random', 3, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":5,'
    '"fakeAnswersCount":3,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-random', 4, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-random', 5, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":5,'
    '"matrixSize":25,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-random', 6, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":6,'
    '"matrixSize":36,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-random', 7, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"questionTimeLimit":30,'
    '"itemsSize":6,'
    '"matrixSize":49,'
    '"answersCount":10,'
    '"fakeAnswersCount":5,'
    '"quantity": 5'
  '}'),

  -- Запомнить уникальную таблицу
  ('matrix-filling-unique', 0, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"matrixSize":9,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-unique', 1, '{'
    '"showTimeLimit":6,'
    '"playTimeLimit":30,'
    '"matrixSize":16,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-unique', 2, '{'
    '"showTimeLimit":4,'
    '"playTimeLimit":30,'
    '"matrixSize":16,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-unique', 3, '{'
    '"showTimeLimit":7,'
    '"playTimeLimit":30,'
    '"matrixSize":25,'
    '"quantity": 3'
  '}'),
  ('matrix-filling-unique', 4, '{'
    '"showTimeLimit":7,'
    '"playTimeLimit":30,'
    '"matrixSize":25,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-unique', 5, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"matrixSize":25,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-unique', 6, '{'
    '"showTimeLimit":8,'
    '"playTimeLimit":30,'
    '"matrixSize":36,'
    '"quantity": 5'
  '}'),
  ('matrix-filling-unique', 7, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":30,'
    '"matrixSize":49,'
    '"quantity": 5'
  '}'),

  -- Числовая таблица на основе паттерна
  ('matrix-sequence-pattern', 0, '{'
    '"timeLimit":30,'
    '"matrixSize":25,'
    '"showSuccess":true,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-pattern', 1, '{'
    '"timeLimit":30,'
    '"matrixSize":25,'
    '"showSuccess":false,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-pattern', 2, '{'
    '"timeLimit":30,'
    '"matrixSize":36,'
    '"showSuccess":false,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-pattern', 3, '{'
    '"timeLimit":30,'
    '"matrixSize":36,'
    '"showSuccess":false,'
    '"quantity": 5'
  '}'),
  ('matrix-sequence-pattern', 4, '{'
    '"timeLimit":30,'
    '"matrixSize":49,'
    '"showSuccess":false,'
    '"quantity": 5'
  '}'),

  -- Случайная числовая таблица
  ('matrix-sequence-random', 0, '{'
    '"timeLimit":30,'
    '"matrixSize":25,'
    '"showSuccess":true,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-random', 1, '{'
    '"timeLimit":30,'
    '"matrixSize":25,'
    '"showSuccess":false,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-random', 2, '{'
    '"timeLimit":30,'
    '"matrixSize":36,'
    '"showSuccess":false,'
    '"quantity": 3'
  '}'),
  ('matrix-sequence-random', 3, '{'
    '"timeLimit":30,'
    '"matrixSize":36,'
    '"showSuccess":false,'
    '"quantity": 5'
  '}'),
  ('matrix-sequence-random', 4, '{'
    '"timeLimit":30,'
    '"matrixSize":49,'
    '"showSuccess":false,'
    '"quantity": 5'
  '}'),

  -- Меньшее в большем
  ('space-part', 0, '{'
    '"timeLimit":60,'
    '"quantity": 3'
  '}'),
  ('space-part', 1, '{'
    '"timeLimit":30,'
    '"quantity": 3'
  '}'),
  ('space-part', 2, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('space-part', 3, '{'
    '"timeLimit":10,'
    '"quantity": 5'
  '}'),
  ('space-part', 4, '{'
    '"timeLimit":7,'
    '"quantity": 5'
  '}'),

  -- Лишняя фигура, 2d поворот
  ('space-waste-2d', 0, '{'
    '"timeLimit":60,'
    '"quantity": 3'
  '}'),
  ('space-waste-2d', 1, '{'
    '"timeLimit":30,'
    '"quantity": 3'
  '}'),
  ('space-waste-2d', 2, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('space-waste-2d', 3, '{'
    '"timeLimit":10,'
    '"quantity": 5'
  '}'),
  ('space-waste-2d', 4, '{'
    '"timeLimit":7,'
    '"quantity": 5'
  '}'),

  -- Лишняя фигура, 2d поворот
  ('space-waste-3d', 0, '{'
    '"timeLimit":60,'
    '"quantity": 3'
  '}'),
  ('space-waste-3d', 1, '{'
    '"timeLimit":30,'
    '"quantity": 3'
  '}'),
  ('space-waste-3d', 2, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('space-waste-3d', 3, '{'
    '"timeLimit":10,'
    '"quantity": 5'
  '}'),
  ('space-waste-3d', 4, '{'
    '"timeLimit":7,'
    '"quantity": 5'
  '}'),

  -- Разминка
  ('table-pipe', 0, '{'
    '"timeLimit":60,'
    '"matrixSize": 30'
  '}'),
  ('table-pipe', 1, '{'
    '"timeLimit":30,'
    '"matrixSize": 30'
  '}'),
  ('table-pipe', 2, '{'
    '"timeLimit":30,'
    '"matrixSize": 40'
  '}'),
  ('table-pipe', 3, '{'
    '"timeLimit":30,'
    '"matrixSize": 40'
  '}'),
  ('table-pipe', 4, '{'
    '"timeLimit": 20,'
    '"matrixSize": 40'
  '}'),

  -- Заполнение таблицы словами
  ('table-words', 0, '{'
    '"timeLimit":120,'
    '"itemsCount":5,'
    '"columnsCount":1'
  '}'),
  ('table-words', 1, '{'
    '"timeLimit":120,'
    '"itemsCount":5,'
    '"columnsCount":2'
  '}'),
  ('table-words', 2, '{'
    '"timeLimit":120,'
    '"itemsCount":5,'
    '"columnsCount":3'
  '}'),
  ('table-words', 3, '{'
    '"timeLimit":90,'
    '"itemsCount":7,'
    '"columnsCount":3'
  '}'),
  ('table-words', 4, '{'
    '"timeLimit":60,'
    '"itemsCount":7,'
    '"columnsCount":3'
  '}'),

  -- Первые буквы слов фразы
  ('text-letters', 0, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":60,'
    '"length":5,'
    '"quantity":3'
  '}'),
  ('text-letters', 1, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":60,'
    '"length":6,'
    '"quantity":3'
  '}'),
  ('text-letters', 2, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":60,'
    '"length":7,'
    '"quantity":3'
  '}'),
  ('text-letters', 3, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":60,'
    '"length":8,'
    '"quantity":3'
  '}'),
  ('text-letters', 4, '{'
    '"showTimeLimit":5,'
    '"playTimeLimit":30,'
    '"length":9,'
    '"quantity":3'
  '}'),

  -- Текст для чтения
  ('text-reading', 0, '{'
    '"timeLimit":60,'
    '"questionTimeLimit":30'
  '}'),
  ('text-reading', 1, '{'
    '"timeLimit":50,'
    '"questionTimeLimit":30'
  '}'),
  ('text-reading', 2, '{'
    '"timeLimit":40,'
    '"questionTimeLimit":20'
  '}'),
  ('text-reading', 3, '{'
    '"timeLimit":30,'
    '"questionTimeLimit":20'
  '}'),
  ('text-reading', 4, '{'
    '"timeLimit":20,'
    '"questionTimeLimit":10'
  '}'),

  -- Тезирование
  ('text-tezirovanie', 0, '{'
    '"timeLimit":60'
  '}'),
  ('text-tezirovanie', 1, '{'
    '"timeLimit":50'
  '}'),
  ('text-tezirovanie', 2, '{'
    '"timeLimit":40'
  '}'),
  ('text-tezirovanie', 3, '{'
    '"timeLimit":30'
  '}'),
  ('text-tezirovanie', 4, '{'
    '"timeLimit":20'
  '}'),

  -- Выбрать наиболее близкое слово
  ('words-close', 0, '{'
    '"timeLimit":60,'
    '"quantity": 3'
  '}'),
  ('words-close', 1, '{'
    '"timeLimit":50,'
    '"quantity": 3'
  '}'),
  ('words-close', 2, '{'
    '"timeLimit":40,'
    '"quantity": 5'
  '}'),
  ('words-close', 3, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('words-close', 4, '{'
    '"timeLimit":20,'
    '"quantity": 5'
  '}'),

  -- Востановить список слов по памяти
  ('words-column', 0, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":5'
  '}'),
  ('words-column', 1, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":6'
  '}'),
  ('words-column', 2, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":7'
  '}'),
  ('words-column', 3, '{'
    '"showTimeLimit":20,'
    '"playTimeLimit":90,'
    '"itemsCount":7'
  '}'),
  ('words-column', 4, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":30,'
    '"itemsCount":7'
  '}'),

  -- Дифиниции к словам
  ('words-definition', 0, '{'
    '"itemTimeLimit":10,'
    '"quantity": 3'
  '}'),
  ('words-definition', 1, '{'
    '"itemTimeLimit":10,'
    '"quantity": 4'
  '}'),
  ('words-definition', 2, '{'
    '"itemTimeLimit":10,'
    '"quantity": 5'
  '}'),
  ('words-definition', 3, '{'
    '"itemTimeLimit":8,'
    '"quantity": 5'
  '}'),
  ('words-definition', 4, '{'
    '"itemTimeLimit":5,'
    '"quantity": 5'
  '}'),

  -- Два столбика слов
  ('words-pairs', 0, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":5'
  '}'),
  ('words-pairs', 1, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":6'
  '}'),
  ('words-pairs', 2, '{'
    '"showTimeLimit":30,'
    '"playTimeLimit":120,'
    '"itemsCount":7'
  '}'),
  ('words-pairs', 3, '{'
    '"showTimeLimit":20,'
    '"playTimeLimit":90,'
    '"itemsCount":7'
  '}'),
  ('words-pairs', 4, '{'
    '"showTimeLimit":10,'
    '"playTimeLimit":30,'
    '"itemsCount":7'
  '}'),

  -- Два столбика слов, антинимы
  ('words-pairs-antonyms', 0, '{'
    '"timeLimit":30,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-antonyms', 1, '{'
    '"timeLimit":20,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-antonyms', 2, '{'
    '"timeLimit":30,'
    '"itemsCount":6'
  '}'),
  ('words-pairs-antonyms', 3, '{'
    '"timeLimit":30,'
    '"itemsCount":7'
  '}'),
  ('words-pairs-antonyms', 4, '{'
    '"timeLimit":20,'
    '"itemsCount":7'
  '}'),

  -- Два столбика слов, паронимы
  ('words-pairs-paronyms', 0, '{'
    '"timeLimit":30,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-paronyms', 1, '{'
    '"timeLimit":20,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-paronyms', 2, '{'
    '"timeLimit":30,'
    '"itemsCount":6'
  '}'),
  ('words-pairs-paronyms', 3, '{'
    '"timeLimit":30,'
    '"itemsCount":7'
  '}'),
  ('words-pairs-paronyms', 4, '{'
    '"timeLimit":20,'
    '"itemsCount":7'
  '}'),

  -- Два столбика слов, синонимы
  ('words-pairs-synonyms', 0, '{'
    '"timeLimit":30,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-synonyms', 1, '{'
    '"timeLimit":20,'
    '"itemsCount":5'
  '}'),
  ('words-pairs-synonyms', 2, '{'
    '"timeLimit":30,'
    '"itemsCount":6'
  '}'),
  ('words-pairs-synonyms', 3, '{'
    '"timeLimit":30,'
    '"itemsCount":7'
  '}'),
  ('words-pairs-synonyms', 4, '{'
    '"timeLimit":20,'
    '"itemsCount":7'
  '}'),

  -- Выбрать лишнее слово
  ('words-waste', 0, '{'
    '"timeLimit":60,'
    '"quantity": 3'
  '}'),
  ('words-waste', 1, '{'
    '"timeLimit":50,'
    '"quantity": 3'
  '}'),
  ('words-waste', 2, '{'
    '"timeLimit":40,'
    '"quantity": 5'
  '}'),
  ('words-waste', 3, '{'
    '"timeLimit":30,'
    '"quantity": 5'
  '}'),
  ('words-waste', 4, '{'
    '"timeLimit":20,'
    '"quantity": 5'
  '}');
