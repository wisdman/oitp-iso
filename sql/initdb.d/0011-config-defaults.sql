SET search_path = "$user";

-- Продолжительность сессии
INSERT INTO private.config("key", "value") VALUES
  ('sessionInterval', '"1 mon"'::jsonb), -- Продолжительность сессии
  ('otrInterval', '"1 hour"'::jsonb), -- Продолжительность действия одноразовой ссылки на вход
  ('smsInterval', '"10 minutes"'::jsonb), -- Продолжительность действия смс на вход
  ('invitesInterval', '"6 mons"'::jsonb), -- Продолжительность действия индивидуального инвайта
  ('trainingTimeLimit', '{"everyday":1800,"once":300}'::jsonb), -- Лимит времени для тренировки
  ('progressItemsLimit', '10'::jsonb), -- Максимальное число тренировок участвующее в статистике
  ('iconsSeries', '{"min":0,"max":285}'::jsonb), -- Список иконок
  ('relaxImagesSeries', '{"min":0,"max":45}'::jsonb); -- Список картинок для релакса

