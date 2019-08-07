SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer_config(_trainer public.trainer__type) RETURNS SETOF RECORD AS $$
BEGIN
  CASE
    WHEN _trainer = 'classification-colors' THEN      -- Активизация лексиклна - цвета
      RETURN QUERY SELECT * FROM private.trainer__classification_colors__config() AS t(config jsonb);
    WHEN _trainer = 'classification-definitions' THEN -- Активизация лексиклна - дифиниции
      RETURN QUERY SELECT * FROM private.trainer__classification_definitions__config() AS t(config jsonb);
    WHEN _trainer = 'classification-words' THEN       -- Активизация лексиклна - слова по группам
      RETURN QUERY SELECT * FROM private.trainer__classification_words__config() AS t(config jsonb);
    WHEN _trainer = 'image-carpets' THEN              -- Наглядно-образная память - коврики
      RETURN QUERY SELECT * FROM private.trainer__image_carpets__config() AS t(config jsonb);
    WHEN _trainer = 'image-differences' THEN          -- Наглядно-образная память - поиск отличий
      RETURN QUERY SELECT * FROM private.trainer__image_differences__config() AS t(config jsonb);
    WHEN _trainer = 'image-expressions' THEN          -- Гармонизация работы полушарий - картинка с текстом
      RETURN QUERY SELECT * FROM private.trainer__image_expressions__config() AS t(config jsonb);
    WHEN _trainer = 'image-fields' THEN               -- Скорость зрительного восприятия - запоминание картинок
      RETURN QUERY SELECT * FROM private.trainer__image_fields__config() AS t(config jsonb);
    WHEN _trainer = 'math-equation' THEN              -- Арифметико-практическое мышление - формулы
      RETURN QUERY SELECT * FROM private.trainer__math_equation__config() AS t(config jsonb);
    WHEN _trainer = 'math-middle' THEN                -- Арифметико-практическое мышление - скобки
      RETURN QUERY SELECT * FROM private.trainer__math_middle__config() AS t(config jsonb);
    WHEN _trainer = 'math-sequence' THEN              -- Арифметико-практическое мышление - последовательности
      RETURN QUERY SELECT * FROM private.trainer__math_sequence__config() AS t(config jsonb);
    WHEN _trainer = 'math-waste' THEN                 -- Арифметико-практическое мышление - лишнее
      RETURN QUERY SELECT * FROM private.trainer__math_waste__config() AS t(config jsonb);
    WHEN _trainer = 'matrix-filling-pattern' THEN     -- Индуктивность - паттерны
      RETURN QUERY SELECT * FROM private.trainer__matrix_filling_pattern__config() AS t(config jsonb);
    WHEN _trainer = 'matrix-filling-unique' THEN      -- Мнемотехника - уникальные
      RETURN QUERY SELECT * FROM private.trainer__matrix_filling_unique__config() AS t(config jsonb);
    WHEN _trainer = 'matrix-sequence-pattern' THEN    -- Индуктивность мышления - числовые паттерны
      RETURN QUERY SELECT * FROM private.trainer__matrix_sequence_pattern__config() AS t(config jsonb);
    WHEN _trainer = 'matrix-sequence-random' THEN     -- Таблицы с произвольным рассположением чисел
      RETURN QUERY SELECT * FROM private.trainer__matrix_sequence_random__config() AS t(config jsonb);
    WHEN _trainer = 'space-waste-2d' THEN             -- Пространство и логика - лишняя фигура 2d
      RETURN QUERY SELECT * FROM private.trainer__space_waste_2d__config() AS t(config jsonb);
    WHEN _trainer = 'space-waste-3d' THEN             -- Пространство и логика - лишняя фигура 3d
      RETURN QUERY SELECT * FROM private.trainer__space_waste_3d__config() AS t(config jsonb);
    WHEN _trainer = 'storytelling' THEN               -- Слуховая память - уадиорассказы
      RETURN QUERY SELECT * FROM private.trainer__storytelling__config() AS t(config jsonb);
    WHEN _trainer = 'table-pipe' THEN                 -- Распределение внимания
      RETURN QUERY SELECT * FROM private.trainer__table_pipe__config() AS t(config jsonb);
    WHEN _trainer = 'text-letters' THEN               -- Точность восприятия - афоризмы
      RETURN QUERY SELECT * FROM private.trainer__text_letters__config() AS t(config jsonb);
    WHEN _trainer = 'text-reading' THEN               -- Точность восприятия - тексты
      RETURN QUERY SELECT * FROM private.trainer__text_reading__config() AS t(config jsonb);
    WHEN _trainer = 'text-tezirovanie' THEN           -- Тезирование
      RETURN QUERY SELECT * FROM private.trainer__text_tezirovanie__config() AS t(config jsonb);
    WHEN _trainer = 'words-column' THEN               -- Мнемотехника - столбики
      RETURN QUERY SELECT * FROM private.trainer__words_column__config() AS t(config jsonb);
    WHEN _trainer = 'words-filling' THEN              -- Вариативность мышления - существительные
      RETURN QUERY SELECT * FROM private.trainer__words_filling__config() AS t(config jsonb);
    WHEN _trainer = 'words-lexis-antonyms' THEN       -- Вербальный интеллект - антонимы
      RETURN QUERY SELECT * FROM private.trainer__words_lexis_antonyms__config() AS t(config jsonb);
    WHEN _trainer = 'words-lexis-paronyms' THEN       -- Вербальный интеллект - паронимы
      RETURN QUERY SELECT * FROM private.trainer__words_lexis_paronyms__config() AS t(config jsonb);
    WHEN _trainer = 'words-lexis-synonyms' THEN       -- Вербальный интеллект - синонимы
      RETURN QUERY SELECT * FROM private.trainer__words_lexis_synonyms__config() AS t(config jsonb);
    WHEN _trainer = 'words-pairs' THEN                -- Точность восприятия - пары слов
      RETURN QUERY SELECT * FROM private.trainer__words_pairs__config() AS t(config jsonb);
    WHEN _trainer = 'words-questions-close' THEN      -- Активизация лексикона - Слово это ...
      RETURN QUERY SELECT * FROM private.trainer__words_questions_close__config() AS t(config jsonb);
    WHEN _trainer = 'words-questions-waste'  THEN      -- Вербальный интеллект - лишнее слово
      RETURN QUERY SELECT * FROM private.trainer__words_questions_waste__config() AS t(config jsonb);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
