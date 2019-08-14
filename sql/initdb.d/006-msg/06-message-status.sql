-- DROP TYPE public.msg_message_status CASCADE;
SELECT private.create_enum_with_description('public.msg_message_status', jsonb_build_object(
  'delivered', 'Доставлено'     ,
  'error'    , 'Ошибка отправки',
  'new'      , 'Новое'          ,
  'sended'   , 'Отправлено'     ,
  'touched'  , 'Использовано'
));
