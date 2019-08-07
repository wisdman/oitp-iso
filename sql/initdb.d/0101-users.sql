SET search_path = "$user";

-- DROP TABLE private.users CASCADE;
CREATE TABLE private.users (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "deleted" timestamp without time zone DEFAULT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "roles" public.user_role[] NOT NULL DEFAULT '{user}'::public.user_role[],

  "email" varchar(256) NOT NULL,
  "phone" varchar(15) DEFAULT NULL,

  "password" bytea DEFAULT NULL, -- digest(_password, 'sha512')
  "2fa" bytea DEFAULT NULL,
  "certificate" bytea DEFAULT NULL, -- необходим для доступа всем выше пользователя

  "oauth"    jsonb NOT NULL DEFAULT '{}'::jsonb,
  "validity" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "profile"  jsonb NOT NULL DEFAULT '{}'::jsonb, -- Профиль пользователя

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()), -- Момент создания

  CONSTRAINT users__pkey PRIMARY KEY ("id"),

  CONSTRAINT users__check__roles CHECK ("roles" @> '{user}'::public.user_role[]),
  CONSTRAINT users__check__email CHECK (public.check_email("email")),
  CONSTRAINT users__check__phone CHECK (public.check_phone("phone")),
  CONSTRAINT users__check__password CHECK (octet_length("password") = 64),
  CONSTRAINT users__check__2fa CHECK (octet_length("2fa") = 32),
  CONSTRAINT users__check__oauth CHECK (jsonb_typeof("oauth") = 'object'),
  CONSTRAINT users__check__validity CHECK (jsonb_typeof("validity") = 'object'),
  CONSTRAINT users__check__profile CHECK (jsonb_typeof("profile") = 'object')
);

CREATE UNIQUE INDEX users__unique_idx__email ON private.users USING btree ("email") WHERE "deleted" IS NULL;
CREATE UNIQUE INDEX users__unique_idx__phone ON private.users USING btree ("phone") WHERE "deleted" IS NULL;

CREATE INDEX users__idx__deleted_enabled ON private.users USING btree ("deleted", "enabled");
