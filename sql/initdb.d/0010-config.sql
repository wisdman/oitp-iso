SET search_path = "$user";

CREATE TABLE private.config (
  "key"         varchar(32) NOT NULL,
  "value"       jsonb       NOT NULL DEFAULT 'null'::jsonb,

  "description" text        NOT NULL DEFAULT '',

  CONSTRAINT config__idx__pkey PRIMARY KEY ("key"),
  CONSTRAINT config__check__key CHECK ("key" ~ '^[a-z][0-9a-zA-Z]+$')
);

INSERT INTO private.config("key", "value", "description") VALUES
  ('sessionInterval', '"1 mon"'::jsonb     , 'Продолжительность сессии'),
  ('otrInterval'    , '"1 hour"'::jsonb    , 'Продолжительность действия одноразовой ссылки на вход'),
  ('smsInterval'    , '"10 minutes"'::jsonb, 'Продолжительность действия смс на вход'),
  ('inviteInterval' , '"6 mons"'::jsonb    , 'Продолжительность действия инвайта');
