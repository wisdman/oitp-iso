SET search_path = "$user";

INSERT INTO private.complexity_defaults("trainer", "complexity") VALUES
  -- Активизация лексиклна - цвета
  ('classification-colors', ('{'
    '"itemTimeLimit": 20,'

    '"minItems": 3,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 1'
  '}')::jsonb),

  -- Активизация лексиклна - дифиниции
  ('classification-definitions', ('{'
    '"playTimeLimit": 60,'

    '"minItems": 3,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 1'
  '}')::jsonb),

  -- Активизация лексиклна - слова по группам
  ('classification-words', ('{'
    '"itemTimeLimit": 20,'

    '"minGroups": 2,'
    '"maxGroups": 3,'

    '"minItems": 3,'
    '"maxItems": 4,'

    '"minQuantity": 1,'
    '"maxQuantity": 1'
  '}')::jsonb),

  -- Наглядно-образная память - коврики
  ('image-carpets', ('{'
    '"previewTimeLimit": 5,'
    '"playTimeLimit": 30,'

    '"complexity": 0,'

    '"minQuantity": 2,'
    '"maxQuantity": 3'
  '}')::jsonb),

  -- Наглядно-образная память - поиск отличий
  ('image-differences', ('{'
    '"showTimeLimit": 10,'
    '"playTimeLimit": 30,'

    '"complexity": 0,'

    '"minQuantity": 2,'
    '"maxQuantity": 3'
  '}')::jsonb),

  -- Гармонизация работы полушарий - картинка с текстом
  ('image-expressions', ('{'
    '"showTimeLimit": 5,'
    '"playTimeLimit": 120,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Скорость зрительного восприятия - запоминание картинок
  ('image-fields', ('{'
    '"showTimeLimit": 5,'
    '"playTimeLimit": 30,'

    '"minItems": 3,'
    '"maxItems": 4,'

    '"minQuantity": 2,'
    '"maxQuantity": 3,'

    '"answersCount": 10'
  '}')::jsonb),

  -- Арифметико-практическое мышление - формулы
  ('math-equation', ('{'
    '"playTimeLimit": 120,'

    '"minItems": 3,'
    '"maxItems": 4,'

    '"uniqueItems": 1,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Арифметико-практическое мышление - скобки
  ('math-middle', ('{'
    '"playTimeLimit": 60,'

    '"complexity": 0,'

    '"itemsCount": 3,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Арифметико-практическое мышление - последовательности
  ('math-sequence', ('{'
    '"playTimeLimit": 60,'

    '"complexity": 0,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Арифметико-практическое мышление - лишнее
  ('math-waste', ('{'
    '"playTimeLimit": 60,'

    '"complexity": 0,'
    '"itemsCount": 20,'

    '"minQuantity": 2,'
    '"maxQuantity": 3'
  '}')::jsonb),

  -- Индуктивность - паттерны
  ('matrix-filling-pattern', ('{'
    '"showTimeLimit": 7,'
    '"playTimeLimit": 60,'

    '"matrixSize": 9,'

    '"minQuantity": 3,'
    '"maxQuantity": 4,'

    '"questionTimeLimit": 60,'
    '"answersCount": 10'
  '}')::jsonb),

  -- Мнемотехника - уникальные
  ('matrix-filling-unique', ('{'
    '"showTimeLimit": 30,'
    '"playTimeLimit": 60,'

    '"matrixSize": 9,'
    '"itemsCount": 15,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Индуктивность мышления - числовые паттерны
  ('matrix-sequence-pattern', ('{'
    '"playTimeLimit": 30,'

    '"matrixSize": 25,'

    '"showSuccess": true,'
    '"useColors": false,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Таблицы с произвольным рассположением чисел
  ('matrix-sequence-random', ('{'
    '"playTimeLimit": 30,'

    '"matrixSize": 25,'

    '"showSuccess": true,'
    '"useColors": false,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Пространство и логика - лишняя фигура 2d
  ('space-waste-2d', ('{'
    '"playTimeLimit": 30,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Пространство и логика - лишняя фигура 3d
  ('space-waste-3d', ('{'
    '"playTimeLimit": 30,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Слуховая память - адиорассказы
  ('storytelling', ('{'
    '"playTimeLimit": 30,'

    '"completed": [],'

    '"minQuantity": 1,'
    '"maxQuantity": 1'
  '}')::jsonb),

  -- Распределение внимания
  ('table-pipe', ('{'
    '"playTimeLimit": 120,'

    '"matrixSize": 30,'

    '"minQuantity": 2,'
    '"maxQuantity": 3'
  '}')::jsonb),

  -- Точность восприятия - афоризмы
  ('text-letters', ('{'
    '"showTimeLimit": 5,'
    '"playTimeLimit": 20,'

    '"maxLength": 6,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Точность восприятия - тексты
  ('text-reading', ('{'
    '"playTimeLimit": 30,'

    '"completed": [],'

    '"minQuantity": 1,'
    '"maxQuantity": 1'
  '}')::jsonb),

  -- Тезирование
  ('text-tezirovanie', ('{'
    '"playTimeLimit": 60,'

    '"completed": [],'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Мнемотехника - столбики
  ('words-column', ('{'
    '"itemTimeLimit": 3,'
    '"playTimeLimit": 60,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Вариативность мышления - существительные
  ('words-filling', ('{'
    '"playTimeLimit": 60,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Вербальный интеллект - антонимы
  ('words-lexis-antonyms', ('{'
    '"playTimeLimit": 40,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Вербальный интеллект - паронимы
  ('words-lexis-paronyms', ('{'
    '"playTimeLimit": 40,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Вербальный интеллект - синонимы
  ('words-lexis-synonyms', ('{'
    '"playTimeLimit": 40,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 1,'
    '"maxQuantity": 2'
  '}')::jsonb),

  -- Точность восприятия - пары слов
  ('words-pairs', ('{'
    '"itemTimeLimit": 5,'
    '"playTimeLimit": 40,'

    '"minItems": 4,'
    '"maxItems": 5,'

    '"minQuantity": 2,'
    '"maxQuantity": 3'
  '}')::jsonb),

  -- Активизация лексикона - Слово это ...
  ('words-questions-close', ('{'
    '"playTimeLimit": 30,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb),

  -- Вербальный интеллект - лишнее слово
  ('words-questions-waste', ('{'
    '"playTimeLimit": 30,'

    '"minQuantity": 3,'
    '"maxQuantity": 4'
  '}')::jsonb);
