SET search_path = "$user";

-- DROP TYPE public.msg_template_id CASCADE;
-- \dT+ public.msg_template_id
SELECT private.create_enum_with_description('public.msg_template_id', jsonb_build_object(
  'email-charge'          , 'Низкий заряд мозга'        ,
  'email-confirm'         , 'Подтверждение почты'       ,
  'email-info'            , 'Рассылка новостей'         ,
  'email-invite'          , 'Инвайт от пользователя'    ,
  'email-otr'             , 'Одноразовая ссылка на вход',
  'email-payment-error'   , 'Ошибка оплаты'             ,
  'email-payment-refunded', 'Возврат средств'           ,
  'email-payment-seccess' , 'Успешная оплата'           ,
  'email-payment-warning' , 'Предупреждение об оплате'  ,
  'email-reset-password'  , 'Сброс пароля'              ,
  'email-self-invite'     , 'Самоинвайт'                ,
  'push-charge'           , 'Низкий заряд мозга'        ,
  'push-info'             , 'Рассылка новостей'         ,
  'push-payment'          , 'Успешная оплата'           ,
  'push-payment-error'    , 'Ошибка оплаты'             ,
  'push-payment-refunded' , 'Возврат средств'           ,
  'push-payment-seccess'  , 'Успешная оплата'           ,
  'push-payment-warning'  , 'Предупреждение об оплате'  ,
  'sms-auth'              , 'Авторизация по SMS'        ,
  'sms-charge'            , 'Низкий заряд мозга'        ,
  'sms-info'              , 'Рассылка новостей'         ,
  'sms-payment-error'     , 'Ошибка оплаты'             ,
  'sms-payment-refunded'  , 'Возврат средств'           ,
  'sms-payment-seccess'   , 'Успешная оплата'           ,
  'sms-payment-warning'   , 'Предупреждение об оплате'
));
