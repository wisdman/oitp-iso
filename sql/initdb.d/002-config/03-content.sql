INSERT INTO private.config("key", "value", "description") VALUES
  ('tariffDefaultLifetime', '"10 year"'::jsonb   , 'Продолжительность действия тарифа по умолчанию'),
  ('sessionInterval'      , '"1 mon"'::jsonb     , 'Продолжительность сессии'),
  ('otrInterval'          , '"1 hour"'::jsonb    , 'Продолжительность действия одноразовой ссылки на вход'),
  ('smsInterval'          , '"10 minutes"'::jsonb, 'Продолжительность действия смс на вход'),
  ('defaultBrainCharge'   , '90'::jsonb          , 'Заряд мозга по умолчанию');
