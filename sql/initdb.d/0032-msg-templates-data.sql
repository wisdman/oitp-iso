SET search_path = "$user";

INSERT INTO private.msg_templates("id", "version", "subject", "body") VALUES
  ('email-charge',           0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-confirm',          0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-info',             0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-invite',           0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-otr',              0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-payment-error',    0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-payment-refunded', 0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-payment-seccess',  0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-payment-warning',  0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-reset-password',   0, 'Заголовок Email сообщения', 'Тело Email сообщения'),
  ('email-self-invite',      0, 'Заголовок Email сообщения', 'Тело Email сообщения'),

  ('sms-auth',             0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-charge',           0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-info',             0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-payment-error',    0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-payment-refunded', 0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-payment-seccess',  0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),
  ('sms-payment-warning',  0, 'Имя отправителя SMS сообщения', 'Тело SMS сообщения'),

  ('push-charge',           0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-info',             0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-payment',          0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-payment-error',    0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-payment-refunded', 0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-payment-seccess',  0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения'),
  ('push-payment-warning',  0, 'Заголовок PUSH сообщения', 'Тело PUSH сообщения');
