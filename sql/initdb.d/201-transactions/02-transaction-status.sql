-- DROP TYPE public.transaction_status CASCADE;
SELECT private.create_enum_with_description('public.transaction_status', jsonb_build_object(
  'AUTHORIZED', 'Средства заблокированы, но не списаны',
  'CONFIRMED' , 'Денежные средства успешно списаны'    ,
  'NEW'       , 'Платёж создан'                        ,
  'PROCESSING', 'Платеж в обработке'                   ,
  'REFUNDED'  , 'Произведен возврат денежных средств'  ,
  'REJECTED'  , 'Ошибка проведения операции'           ,
  'REVERSED'  , 'Операция отменена'
));
