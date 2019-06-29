
-- classification-colors - Активизация лексиклна - цвета
CREATE OR REPLACE FUNCTION public.trainer__classification_colors__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- classification-definitions - Активизация лексиклна - дифиниции
CREATE OR REPLACE FUNCTION public.trainer__classification_definitions__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN (COALESCE((result->>'success')::int, 0) - COALESCE((result->>'error')::int, 0))
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- classification-words - Активизация лексиклна - слова по группам
CREATE OR REPLACE FUNCTION public.trainer__classification_words__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- image-carpets - Наглядно-образная память - коврики
CREATE OR REPLACE FUNCTION public.trainer__image_carpets__result(config jsonb, result jsonb)
RETURNS int AS $$
DECLARE
  success int;
  max int;
BEGIN
  success := COALESCE((result->>'success')::int, 0);
  max := success + COALESCE((result->>'error')::int, 0);
  RETURN success * 100 / max;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- image-differences - Наглядно-образная память - поиск отличий
CREATE OR REPLACE FUNCTION public.trainer__image_difference__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- image-expressions - Гармонизация работы полушарий - картинка с текстом
CREATE OR REPLACE FUNCTION public.trainer__image_expressions__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  IF config->>'ui' <> 'image-expressions-question' THEN
    RETURN NULL;
  END IF;

  IF COALESCE((result->>'success')::int, 0) > 0 THEN
    RETURN 100;
  END IF;
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- image-fields - Скорость зрительного восприятия - запоминание картинок
CREATE OR REPLACE FUNCTION public.trainer__image_fields__result(config jsonb, result jsonb)
RETURNS int AS $$
DECLARE
  itemsCount int;
BEGIN
  IF config->>'ui' <> 'image-field-question' THEN
    RETURN NULL;
  END IF;

  itemsCount := (SELECT COUNT(*) FROM jsonb_array_elements(config->'items') AS j WHERE (j->'correct')::bool);
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / itemsCount;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- math-equation - Арифметико-практическое мышление - формулы
-- math-middle - Арифметико-практическое мышление - скобки
-- math-sequence - Арифметико-практическое мышление - последовательности
-- math-waste - Арифметико-практическое мышление - лишнее
CREATE OR REPLACE FUNCTION public.trainer__math__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  IF COALESCE((result->>'success')::int, 0) > 0 THEN
    RETURN 100;
  END IF;
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- matrix-filling-pattern - Индуктивность - паттерны
-- matrix-filling-unique - Мнемотехника - уникальные
CREATE OR REPLACE FUNCTION public.trainer__matrix_filling__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  IF config->>'ui' = 'matrix-filling-question' THEN
    RETURN NULL;
  END IF;

  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'matrix', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- matrix-sequence-pattern - Индуктивность мышления - числовые паттерны
-- matrix-sequence-random - Таблицы с произвольным рассположением чисел
CREATE OR REPLACE FUNCTION public.trainer__matrix_sequence__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN (COALESCE((result->>'success')::int, 0) - COALESCE((result->>'error')::int, 0))
         * 100
         / jsonb_array_length(COALESCE(config->'matrix', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- space-waste-2d - Пространство и логика - лишняя фигура 2d
-- space-waste-3d - Пространство и логика - лишняя фигура 3d
CREATE OR REPLACE FUNCTION public.trainer__space__result(config jsonb, result jsonb)
RETURNS int AS $$
DECLARE
  itemsCount int;
BEGIN
  itemsCount := (SELECT COUNT(*) FROM jsonb_array_elements(config->'items') AS j WHERE (j->'correct')::bool);
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / itemsCount;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- storytelling - Слуховая память - уадиорассказы
CREATE OR REPLACE FUNCTION public.trainer__storytelling__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  IF config->>'ui' <> 'storytelling-question' THEN
    RETURN NULL;
  END IF;

  IF COALESCE((result->>'success')::int, 0) > 0 THEN
    RETURN 100;
  END IF;
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- table-pipe-en - Распределение внимания - английские буквы
-- table-pipe-number - Распределение внимания - числа
-- table-pipe-ru - Распределение внимания - русские буквы
CREATE OR REPLACE FUNCTION public.trainer__table_pipe__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'matrix', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- table-words - Вариативность мышления - существительные
CREATE OR REPLACE FUNCTION public.trainer__table_words__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'runes', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- text-letters - Точность восприятия - афоризмы
CREATE OR REPLACE FUNCTION public.trainer__text_letters__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- text-reading - Точность восприятия - тексты
CREATE OR REPLACE FUNCTION public.trainer__text_reading__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  IF config->>'ui' <> 'text-reading-question' THEN
    RETURN NULL;
  END IF;

  IF COALESCE((result->>'success')::int, 0) > 0 THEN
    RETURN 100;
  END IF;
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- text-tezirovanie - Тезирование
CREATE OR REPLACE FUNCTION public.trainer__text_tezirovanie__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN 0;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- words-column - Мнемотехника - столбики
CREATE OR REPLACE FUNCTION public.trainer__words_column__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- words-lexis-antonyms - Вербальный интеллект - антонимы
-- words-lexis-paronyms - Вербальный интеллект - паронимы
-- words-lexis-synonyms - Вербальный интеллект - синонимы
CREATE OR REPLACE FUNCTION public.trainer__words_lexis__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- words-pairs - Точность восприятия - пары слов
CREATE OR REPLACE FUNCTION public.trainer__words_pairs__result(config jsonb, result jsonb)
RETURNS int AS $$
BEGIN
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / jsonb_array_length(COALESCE(config->'items', '[]'::jsonb));
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;

-- words-questions-close - Активизация лексикона - Слово это ...
-- words-questions-waste - Вербальный интеллект - лишнее слово
CREATE OR REPLACE FUNCTION public.trainer__words_questions__result(config jsonb, result jsonb)
RETURNS int AS $$
DECLARE
  itemsCount int;
BEGIN
  itemsCount := (SELECT COUNT(*) FROM jsonb_array_elements(config->'items') AS j WHERE (j->'correct')::bool);
  RETURN COALESCE((result->>'success')::int, 0)
         * 100
         / itemsCount;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN 0;
END
$$ LANGUAGE plpgsql IMMUTABLE;






-- Trainer result selector
CREATE OR REPLACE FUNCTION public.trainer__result(config jsonb, result jsonb) RETURNS int
AS $$
DECLARE
  id text;
BEGIN
  id := config->>'id';
  CASE id
    WHEN 'classification-colors' THEN
      RETURN public.trainer__classification_colors__result(config, result);
    WHEN 'classification-definitions' THEN
      RETURN public.trainer__classification_definitions__result(config, result);
    WHEN 'classification-words' THEN
      RETURN public.trainer__classification_words__result(config, result);
    WHEN 'image-carpets' THEN
      RETURN public.trainer__image_carpets__result(config, result);
    WHEN 'image-difference' THEN
      RETURN public.trainer__image_difference__result(config, result);
    WHEN 'image-expressions' THEN
      RETURN public.trainer__image_expressions__result(config, result);
    WHEN 'image-fields' THEN
      RETURN public.trainer__image_fields__result(config, result);
    WHEN 'math-equation' THEN
      RETURN public.trainer__math__result(config, result);
    WHEN 'math-middle' THEN
      RETURN public.trainer__math__result(config, result);
    WHEN 'math-sequence' THEN
      RETURN public.trainer__math__result(config, result);
    WHEN 'math-waste' THEN
      RETURN public.trainer__math__result(config, result);
    WHEN 'matrix-filling-pattern' THEN
      RETURN public.trainer__matrix_filling__result(config, result);
    WHEN 'matrix-filling-unique' THEN
      RETURN public.trainer__matrix_filling__result(config, result);
    WHEN 'matrix-sequence-pattern' THEN
      RETURN public.trainer__matrix_sequence__result(config, result);
    WHEN 'matrix-sequence-random' THEN
      RETURN public.trainer__matrix_sequence__result(config, result);
    WHEN 'space-waste-2d' THEN
      RETURN public.trainer__space__result(config, result);
    WHEN 'space-waste-3d' THEN
      RETURN public.trainer__space__result(config, result);
    WHEN 'storytelling' THEN
      RETURN public.trainer__storytelling__result(config, result);
    WHEN 'table-pipe-en' THEN
      RETURN public.trainer__table_pipe__result(config, result);
    WHEN 'table-pipe-number' THEN
      RETURN public.trainer__table_pipe__result(config, result);
    WHEN 'table-pipe-ru' THEN
      RETURN public.trainer__table_pipe__result(config, result);
    WHEN 'table-words' THEN
      RETURN public.trainer__table_words__result(config, result);
    WHEN 'text-letters' THEN
      RETURN public.trainer__text_letters__result(config, result);
    WHEN 'text-reading' THEN
      RETURN public.trainer__text_reading__result(config, result);
    WHEN 'text-tezirovanie' THEN
      RETURN public.trainer__text_tezirovanie__result(config, result);
    WHEN 'words-column' THEN
      RETURN public.trainer__words_column__result(config, result);
    WHEN 'words-lexis-antonyms' THEN
      RETURN public.trainer__words_lexis__result(config, result);
    WHEN 'words-lexis-paronyms' THEN
      RETURN public.trainer__words_lexis__result(config, result);
    WHEN 'words-lexis-synonyms' THEN
      RETURN public.trainer__words_lexis__result(config, result);
    WHEN 'words-pairs' THEN
      RETURN public.trainer__words_pairs__result(config, result);
    WHEN 'words-questions-close' THEN
      RETURN public.trainer__words_questions__result(config, result);
    WHEN 'words-questions-waste' THEN
      RETURN public.trainer__words_questions__result(config, result);
    ELSE
      RETURN 0;
  END CASE;
END
$$ LANGUAGE plpgsql IMMUTABLE;





SELECT
  "config"->>'id' AS "id",
  "result",
  "config",
  public.trainer__result("config", "result")
FROM (
  SELECT
    jsonb_array_elements("results") AS "result",
    jsonb_array_elements("trainers") AS "config"
  FROM public.training
) t
WHERE
  "result"->>'uuid' = "config"->>'uuid'
  AND
  "config"->>'id' = 'words-pairs';


SELECT
  "config"->>'id' AS "id",
  public.trainer__result("config", "result") AS "result"
FROM (
  SELECT
    jsonb_array_elements("results") AS "result",
    jsonb_array_elements("trainers") AS "config"
  FROM public.training
) t
WHERE
  "result"->>'uuid' = "config"->>'uuid';
