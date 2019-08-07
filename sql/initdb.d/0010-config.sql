SET search_path = "$user";

-- DROP TABLE private.config CASCADE;
CREATE TABLE private.config (
  "key"         varchar(64) NOT NULL,
  "secure"      boolean     NOT NULL DEFAULT FALSE,
  "value"       jsonb       NOT NULL DEFAULT 'null'::jsonb,
  "description" text        NOT NULL DEFAULT '',

  CONSTRAINT config__pkey PRIMARY KEY ("key"),
  CONSTRAINT config__check__key CHECK ("key" ~ '^[a-z][0-9a-zA-Z]+$')
);

INSERT INTO private.config("key", "secure", "value", "description") VALUES
  ('tariffDefaultLifetime', DEFAULT, '"10 year"'::jsonb   , 'Продолжительность действия тарифа по умолчанию'),
  ('sessionInterval'      , DEFAULT, '"1 mon"'::jsonb     , 'Продолжительность сессии'),
  ('otrInterval'          , DEFAULT, '"1 hour"'::jsonb    , 'Продолжительность действия одноразовой ссылки на вход'),
  ('smsInterval'          , DEFAULT, '"10 minutes"'::jsonb, 'Продолжительность действия смс на вход');
