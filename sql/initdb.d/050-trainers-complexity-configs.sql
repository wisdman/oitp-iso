SET search_path = "$user";

CREATE TYPE public.trainers__type AS ENUM (
  'classification-colors',
  'classification-words',
  'image-field',
  'image-fields',
  'matrix-filling',
  'matrix-random-filling',
  'matrix-unique-filling',
  'matrix-random-sequence',
  'matrix-sequence',
  'question-close-words',
  'question-waste-words',
  'table-pipe',
  'text-letters',
  'text-pairs',
  'text-reading',
  'text-sort',
  'text-tezirovanie'
);


CREATE TABLE private.trainers_complexity_configs (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "trainer"    public.trainers__type NOT NULL,
  "complexity" smallint NOT NULL,
  "config"     jsonb    NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT trainers_complexity_configs__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainers_complexity_configs__check__config  CHECK ("config"::text ~ '^{')
) WITH (OIDS = FALSE);

CREATE VIEW public.trainers_complexity_configs AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",
    t."trainer" as "trainer",
    t."complexity" as "complexity",
    t."config" as "config"
  FROM private.trainers_complexity_configs t
  WHERE NOT t."deleted";

GRANT SELECT ON public.trainers_complexity_configs TO api;

-- Default config
INSERT INTO private.trainers_complexity_configs("trainer", "complexity", "config") VALUES
  -- Image fields
  ('image-fields', 0, '{"showTimeLimit":3, "questionTimeLimit": 30, "quantity": 3, "minItems": 3, "maxItems": 4, "answersCount": 10, "fakeAnswersCount": 5}'),

  -- Matrix filling
  ('matrix-filling', 0, '{ "showTimeLimit":5, "playTimeLimit": 30, "questionTimeLimit": 30, "quantity": 5, "itemsSize": 3, "matrixSize": 16, "answersCount": 5, "fakeAnswersCount": 3}'),

  -- Matrix random filling
  ('matrix-random-filling', 0, '{ "showTimeLimit":5, "playTimeLimit": 30, "questionTimeLimit": 30, "quantity": 5, "itemsSize": 3, "matrixSize": 16, "answersCount": 5, "fakeAnswersCount": 3}'),

  -- Matrix unique filling
  ('matrix-unique-filling', 0, '{ "showTimeLimit":20, "playTimeLimit": 40, "questionTimeLimit": 30, "quantity": 3, "matrixSize": 9, "answersCount": 5, "fakeAnswersCount": 3}'),

  -- Matrix random sequence
  ('matrix-random-sequence', 0, '{ "timeLimit":30, "quantity": 5, "matrixSize": 25, "showSuccess": true}'),

  -- Matrix sequence
  ('matrix-sequence', 0, '{ "timeLimit":30, "quantity": 5, "matrixSize": 25, "showSuccess": true}'),

  -- Table pipe
  ('table-pipe', 0, '{"timeLimit":15, "matrixSize": 30}'),

  -- Classification words
  ('classification-words', 0, '{"timeLimit":120, "wordTimeLimit":10, "quantity": 3, "minItems": 3, "maxItems": 5}'),

  -- Question close words
  ('question-close-words', 0, '{"timeLimit": 20, "quantity": 3}'),

  -- Question waste words
  ('question-waste-words', 0, '{"timeLimit": 20, "quantity": 3}'),




  -- classification-colors
  ('classification-colors', 0, '{"itemsLimit":5, "itemTimeLimit":7, "timeLimit": 35 }'),
  ('classification-colors', 1, '{"itemsLimit":5, "itemTimeLimit":7, "timeLimit": 35 }'),



  -- table-pip
  ('table-pipe', 0, '{"size":30, "itemsCount": 3, "timeLimit": 30 }'),
  ('table-pipe', 1, '{"size":30, "itemsCount": 3, "timeLimit": 30 }'),
  -- text-letters
  ('text-letters', 0, '{"itemsLimit": 5, "timeLimit": 30}'),
  ('text-letters', 1, '{"itemsLimit": 5, "timeLimit": 30}'),
  -- text-pairs
  ('text-pairs', 0, '{"itemsLimit": 5, "timeLimit": 30}'),
  ('text-pairs', 1, '{"itemsLimit": 5, "timeLimit": 30}'),
  -- text-reading
  ('text-reading', 0, '{"timeLimit": 60}'),
  ('text-reading', 1, '{"timeLimit": 60}'),
  -- text-sort
  ('text-sort', 0, '{"itemsLimit": 5, "timeLimit": 30}'),
  ('text-sort', 1, '{"itemsLimit": 5, "timeLimit": 30}'),
  -- text-tezirovanie
  ('text-tezirovanie', 0, '{"timeLimit": 30}'),
  ('text-tezirovanie', 1, '{"timeLimit": 30}');