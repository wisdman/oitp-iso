SET search_path = "$user";

CREATE TYPE public.users__role AS ENUM (
  'administrator', -- Администратор, полные полномочия
  'manager', -- Преподователь или Руководитель школы
  'user' -- Пользователь
);

CREATE TABLE private.users (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "roles"   public.users__role[] NOT NULL DEFAULT '{user}'::public.users__role[],

  "email" varchar(256) DEFAULT NULL,
  "emailIsValid" bool DEFAULT FALSE,

  "phone" varchar(15)  DEFAULT NULL,
  "phoneIsValid" bool DEFAULT FALSE,

  "password" bytea DEFAULT NULL,
  "certificate" bytea DEFAULT NULL, -- необходим для доступа всем выше пользователя
  "oauth"       jsonb NOT NULL DEFAULT '{}'::jsonb,

  "name"    text NOT NULL DEFAULT '', -- Имя Отчество
  "surname" text NOT NULL DEFAULT '', -- Фамилия
  "avatar"  oid  DEFAULT NULL,

  "profile" jsonb NOT NULL DEFAULT '{}'::jsonb, -- Профиль пользователя
  "tariff" uuid DEFAULT NULL,

  "timezone" interval NOT NULL DEFAULT '0'::interval,

  "registrationTS" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()), -- Момент регистрации

  CONSTRAINT users__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT users__check__email CHECK ("email" ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),
  CONSTRAINT users__check__phone CHECK ("phone" ~ '^[0-9]{11,15}$'),

  CONSTRAINT users__check__password CHECK ("password" IS NULL OR octet_length("password") = 64),

  CONSTRAINT users__check__oauth CHECK (jsonb_typeof("oauth") = 'object'),
  CONSTRAINT users__check__profile CHECK (jsonb_typeof("profile") = 'object'),

  CONSTRAINT users__fkey__avatar
    FOREIGN KEY ("avatar")
    REFERENCES private.files("id")
    ON UPDATE CASCADE ON DELETE SET NULL,

  CONSTRAINT users__fkey__tariff
    FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE NO ACTION
) WITH (OIDS = FALSE);

-- Check unique indexes
CREATE UNIQUE INDEX users__idx__unique_email ON private.users USING btree ("email");
CREATE UNIQUE INDEX users__idx__unique_phone ON private.users USING btree ("phone");
