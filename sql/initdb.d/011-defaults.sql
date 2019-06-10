SET search_path = "$user";

-- Продолжительность сессии
INSERT INTO private.config("key", "value") VALUES ('sessionInterval', '"1 mon"'::jsonb);

-- Продолжительность действия одноразовой ссылки на вход
INSERT INTO private.config("key", "value") VALUES ('otrInterval', '"1 hour"'::jsonb);

-- Продолжительность действия смс на вход
INSERT INTO private.config("key", "value") VALUES ('smsInterval', '"10 minutes"'::jsonb);

-- Продолжительность действия индивидуального инвайта
INSERT INTO private.config("key", "value") VALUES ('invitesInterval', '"6 mons"'::jsonb);
