SET search_path = "$user";

INSERT INTO private.training_configs("description", "type", "timeLimit", "trainers") VALUES
  ('Ежедневная', 'everyday', 1800, $$ [[
    "table-pipe"
  ],[
    "classification-colors",
    "classification-definitions",
    "classification-words",
    "image-carpets",
    "image-expressions",
    "image-fields",
    "math-middle",
    "math-sequence",
    "math-waste",
    "matrix-filling-pattern",
    "matrix-filling-unique",
    "matrix-sequence-pattern",
    "space-waste-2d",
    "storytelling",
    "text-letters",
    "text-reading",
    "text-tezirovanie",
    "words-column",
    "words-filling",
    "words-lexis-antonyms",
    "words-lexis-paronyms",
    "words-lexis-synonyms",
    "words-pairs",
    "words-questions-close",
    "words-questions-waste"
  ],[
    "matrix-sequence-random"
  ]] $$::jsonb),

  ('Разовая', 'everyday', 300, $$ [[
    "matrix-filling-pattern"
  ]] $$::jsonb),

  ('Разовая', 'everyday', 300, $$ [[
    "matrix-sequence-pattern"
  ]] $$::jsonb),

  ('Разовая', 'everyday', 300, $$ [[
    "matrix-sequence-random"
  ]] $$::jsonb);
