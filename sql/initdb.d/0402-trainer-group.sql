SET search_path = "$user";

-- DROP TYPE public.trainer_group CASCADE;
-- \dT+ public.trainer_group
SELECT private.create_enum_with_description('public.trainer_group', jsonb_build_object(
    'perception'         , 'Точность восприятия'             ,
    'arithmetic'         , 'Арифметико-практическое мышление',
    'attention'          , 'Распределение внимания'          ,
    'auditory-memory'    , 'Слуховая память'                 ,
    'harmonization'      , 'Гармонизация работы полушарий'   ,
    'inductance'         , 'Индуктивность мышления'          ,
    'lexicon'            , 'Активизация лексикона'           ,
    'mnemonics'          , 'Мнемотехника'                    ,
    'numeric-tables'     , 'Числовые таблицы'                ,
    'space-logic'        , 'Пространство и логика'           ,
    'teasing'            , 'Тезирование'                     ,
    'variability'        , 'Вариативность мышления'          ,
    'verbal-intelligence', 'Вербальный интеллект'            ,
    'visual-memory'      , 'Наглядно-образная память'        ,
    'visual-perception'  , 'Скорость зрительного восприятия' ,
    'intelligence'       , 'Мышление'                        ,
    'knowledge'          , 'Эрудиция'                        ,
    'memory'             , 'Память'
));
