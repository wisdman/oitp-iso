SET search_path = "$user";

-- Продолжительность сессии
INSERT INTO private.config("key", "value") VALUES
  ('sessionInterval', '"1 mon"'::jsonb), -- Продолжительность сессии
  ('otrInterval', '"1 hour"'::jsonb), -- Продолжительность действия одноразовой ссылки на вход
  ('smsInterval', '"10 minutes"'::jsonb), -- Продолжительность действия смс на вход
  ('invitesInterval', '"6 mons"'::jsonb); -- Продолжительность действия индивидуального инвайта
