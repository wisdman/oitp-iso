SET search_path = "$user";

-- DROP TYPE public.msg_message_status CASCADE;
-- \dT+ public.msg_message_status
SELECT private.create_enum_with_description('public.msg_message_status', jsonb_build_object(
  'delivered', 'Доставлено'     ,
  'error'    , 'Ошибка отправки',
  'new'      , 'Новое'          ,
  'sended'   , 'Отправлено'     ,
  'touched'  , 'Использовано'
));
