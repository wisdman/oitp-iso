SET search_path = "$user";

-- DROP TYPE public.trainer_type CASCADE;
-- \dT+ public.trainer_type
SELECT private.create_enum_with_description('public.trainer_type', jsonb_build_object(
  'classification-colors'     , 'Активизация лексиклна - цвета'                         ,
  'classification-definitions', 'Активизация лексиклна - дифиниции'                     ,
  'classification-words'      , 'Активизация лексиклна - слова по группам'              ,
  'image-carpets'             , 'Наглядно-образная память - коврики'                    ,
  'image-differences'         , 'Наглядно-образная память - поиск отличий'              ,
  'image-expressions'         , 'Гармонизация работы полушарий - картинка с текстом'    ,
  'image-fields'              , 'Скорость зрительного восприятия - запоминание картинок',
  'math-equation'             , 'Арифметико-практическое мышление - формулы'            ,
  'math-middle'               , 'Арифметико-практическое мышление - скобки'             ,
  'math-sequence'             , 'Арифметико-практическое мышление - последовательности' ,
  'math-waste'                , 'Арифметико-практическое мышление - лишнее'             ,
  'matrix-filling-pattern'    , 'Индуктивность - паттерны'                              ,
  'matrix-filling-question'   , 'Индуктивность - вопросы к паттернам'                   ,
  'matrix-filling-unique'     , 'Мнемотехника - уникальные'                             ,
  'matrix-sequence-infinite'  , 'Бесконечная числовая таблица'                          ,
  'matrix-sequence-pattern'   , 'Индуктивность мышления - числовые паттерны'            ,
  'matrix-sequence-random'    , 'Таблицы с произвольным рассположением чисел'           ,
  'relax'                     , 'Расслабление'                                          ,
  'space-waste-2d'            , 'Пространство и логика - лишняя фигура 2d'              ,
  'space-waste-3d'            , 'Пространство и логика - лишняя фигура 3d'              ,
  'storytelling'              , 'Слуховая память - уадиорассказы'                       ,
  'table-pipe'                , 'Распределение внимания'                                ,
  'text-letters'              , 'Точность восприятия - афоризмы'                        ,
  'text-reading'              , 'Точность восприятия - тексты'                          ,
  'text-tezirovanie'          , 'Тезирование'                                           ,
  'words-column'              , 'Мнемотехника - столбики'                               ,
  'words-filling'             , 'Вариативность мышления - существительные'              ,
  'words-lexis-antonyms'      , 'Вербальный интеллект - антонимы'                       ,
  'words-lexis-paronyms'      , 'Вербальный интеллект - паронимы'                       ,
  'words-lexis-synonyms'      , 'Вербальный интеллект - синонимы'                       ,
  'words-pairs'               , 'Точность восприятия - пары слов'                       ,
  'words-questions-close'     , 'Активизация лексикона - Слово это ...'                 ,
  'words-questions-waste'     , 'Вербальный интеллект - лишнее слово'
));

CREATE OR REPLACE FUNCTION public.check_trainer_type_array(_value jsonb) RETURNS bool AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM (SELECT jsonb_array_elements_text("value") AS "value" FROM jsonb_array_elements(_value)) AS t
    WHERE public.check_trainer_type("value") = FALSE
  )
$$ LANGUAGE sql IMMUTABLE STRICT;
