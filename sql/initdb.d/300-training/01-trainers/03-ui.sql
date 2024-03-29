-- DROP TYPE public.trainer_ui CASCADE;
SELECT private.create_enum_with_description('public.trainer_ui', jsonb_build_object(
  'classification-colors'     , 'Активизация лексиклна - цвета'                        ,
  'classification-definitions', 'Активизация лексиклна - дифиниции'                    ,
  'classification-words'      , 'Активизация лексиклна - слова по группам'             ,
  'image-carpets'             , 'Коврики - составление'                                ,
  'image-differences'         , 'Поиск отличий - составление'                          ,
  'image-differences-preview' , 'Поиск отличий - показ'                                ,
  'image-expressions'         , 'Картинка с текстом - вопрос'                          ,
  'image-expressions-preview' , 'Картинка с текстом - показ'                           ,
  'image-fields-preview'      , 'Запоминание картинок - показ'                         ,
  'image-fields-question'     , 'Запоминание картинок - вопрос'                        ,
  'math-equation'             , 'Арифметико-практическое мышление - формулы'           ,
  'math-middle'               , 'Арифметико-практическое мышление - скобки'            ,
  'math-sequence'             , 'Арифметико-практическое мышление - последовательности',
  'math-waste'                , 'Арифметико-практическое мышление - лишнее'            ,
  'matrix-images-filling'     , 'Матрицы с картинками - заполнение'                    ,
  'matrix-images-preview'     , 'Матрицы с картинками - показ'                         ,
  'matrix-images-question'    , 'Матрицы с картинками - вопрос'                        ,
  'matrix-sequence-infinite'  , 'Бесконечная числовая таблица'                         ,
  'matrix-sequence-filling'   , 'Числовые таблицы - восстановление'                    ,
  'matrix-sequence-play'      , 'Числовые таблицы - проход'                            ,
  'relax'                     , 'Расслабление'                                         ,
  'space-question-waste'      , 'Лишняя фигура'                                        ,
  'storytelling'              , 'Адиорассказ'                                          ,
  'table-pipe'                , 'Распределение внимания'                               ,
  'text-letters'              , 'Афоризмы - заполнение первой буквы'                   ,
  'text-letters-preview'      , 'Афоризмы - показ'                                     ,
  'text-question-tof'         , 'Истина или Ложь'                                      ,
  'text-reading'              , 'Тексты - чтение'                                      ,
  'text-tezirovanie'          , 'Тезирование'                                          ,
  'words-column'              , 'Столбики слов - заполнение'                           ,
  'words-column-preview'      , 'Столбики слов - показ'                                ,
  'words-filling'             , 'Заполнение слов'                                      ,
  'words-lexis'               , 'Лексические пары'                                     ,
  'words-pairs'               , 'Пары слов - заполнение'                               ,
  'words-pairs-preview'       , 'Пары слов - показ'                                    ,
  'words-questions-close'     , 'Слово это ...'                                        ,
  'words-questions-waste'     , 'Лишнее слово'
));
