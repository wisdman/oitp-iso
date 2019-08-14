INSERT INTO private.config("key", "secure", "value", "description") VALUES
  ('tariffDefaultLifetime', DEFAULT, '"10 year"'::jsonb   , 'Продолжительность действия тарифа по умолчанию'),
  ('sessionInterval'      , DEFAULT, '"1 mon"'::jsonb     , 'Продолжительность сессии'),
  ('otrInterval'          , DEFAULT, '"1 hour"'::jsonb    , 'Продолжительность действия одноразовой ссылки на вход'),
  ('smsInterval'          , DEFAULT, '"10 minutes"'::jsonb, 'Продолжительность действия смс на вход');
