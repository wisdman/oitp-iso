SET search_path = "$user";

-- DROP TYPE public.transaction_status CASCADE;
-- \dT+ public.transaction_status
SELECT private.create_enum_with_description('public.transaction_status', jsonb_build_object(
  'authorized', 'Средства заблокированы, но не списаны',
  'canceled'  , 'Платёж отменен'                       ,
  'confirmed' , 'Денежные средства успешно списаны'    ,
  'error'     , 'Ошибка проведения операции'           ,
  'new'       , 'Платёж создан'                        ,
  'processing', 'Платеж в обработке'                   ,
  'refund'    , 'Запрос на возврат средств'            ,
  'refunded'  , 'Произведен возврат денежных средств'  ,
  'refunding' , 'Возврат в обработке'
));
