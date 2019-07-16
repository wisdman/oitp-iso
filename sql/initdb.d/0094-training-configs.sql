SET search_path = "$user";

CREATE TABLE private.training_configs (
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  "type" public.training__type NOT NULL,

  "timeLimit" smallint NOT NULL,
  "trainers" jsonb NOT NULL,

  CONSTRAINT training_configs__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT training_configs__check__timeLimit CHECK ("timeLimit" >= 0),
  CONSTRAINT training_configs__check__trainers
    CHECK (jsonb_typeof("trainers") = 'array' AND jsonb_array_length("trainers") > 0)
) WITH (OIDS = FALSE);

INSERT INTO private.training_configs("type", "timeLimit", "trainers") VALUES
  -- Ежедневные
  ('everyday', 1800, ('['
    '["table-pipe"],'
    '["classification-colors","classification-definitions","classification-words","image-carpets","image-expressions","image-fields","math-middle","math-sequence","math-waste","matrix-filling-pattern","matrix-filling-unique","matrix-sequence-pattern","space-waste-2d","storytelling","text-letters","text-reading","text-tezirovanie","words-column","words-filling","words-lexis-antonyms","words-lexis-paronyms","words-lexis-synonyms","words-pairs","words-questions-close","words-questions-waste"],'
    '["matrix-sequence-random"]'
  ']')::jsonb),

  -- Разовые
  ('once', 300, ('[["matrix-filling-pattern"]]')::jsonb),
  ('once', 300, ('[["matrix-sequence-pattern"]]')::jsonb),
  ('once', 300, ('[["matrix-sequence-random"]]')::jsonb),

  -- Debug
  ('debug', 999, ('[["classification-colors"]]')::jsonb);