SET search_path = "$user";

CREATE TYPE public.trainers__type AS ENUM (
  'classification-colors',
  'classification-words',
  'image-field',
  'image-fields',
  'matrix-filling',
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
  -- classification-colors
  ('classification-colors', 0, '{"itemsLimit":5, "itemTimeLimit":7, "timeLimit": 35 }'),
  ('classification-colors', 1, '{"itemsLimit":5, "itemTimeLimit":7, "timeLimit": 35 }'),
  -- classification-words
  ('classification-words', 0, '{"groupLimit":3, "itemsLimit":5, "itemTimeLimit": 7, "timeLimit": 105 }'),
  ('classification-words', 1, '{"groupLimit":3, "itemsLimit":5, "itemTimeLimit": 7, "timeLimit": 105 }'),
  -- image-fields
  ('image-fields', 0, '{"pages":3, "minItemsPerPage": 3, "maxItemsPerPage": 4, "extraItems": 3, "timeLimit": 30, "pageTimeLimit": 5, "answersCoint": 9}'),
  ('image-fields', 1, '{"pages":3, "minItemsPerPage": 3, "maxItemsPerPage": 4, "extraItems": 3, "timeLimit": 30, "pageTimeLimit": 5, "answersCoint": 9}'),
  -- matrix-filling
  ('matrix-filling', 0, '{"size":3, "showTimeLimit": 5, "playTimeLimit": 60}'),
  ('matrix-filling', 1, '{"size":4, "showTimeLimit": 5, "playTimeLimit": 60}'),
  -- matrix-random-sequence
  ('matrix-random-sequence', 0, '{"size":25, "timeLimit": 60, "showSuccess": true, "quantity": 5 }'),
  ('matrix-random-sequence', 1, '{"size":25, "timeLimit": 60, "showSuccess": true, "quantity": 5 }'),
  -- matrix-sequence
  ('matrix-sequence', 0, '{"size":25, "timeLimit": 60, "showSuccess": true, "quantity": 5 }'),
  ('matrix-sequence', 1, '{"size":25, "timeLimit": 60, "showSuccess": true, "quantity": 5 }'),
  -- question-close-words
  ('question-close-words', 0, '{"timeLimit": 30}'),
  ('question-close-words', 1, '{"timeLimit": 30}'),
  -- question-waste-words
  ('question-waste-words', 0, '{"timeLimit": 30}'),
  ('question-waste-words', 1, '{"timeLimit": 30}'),
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