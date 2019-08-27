-- DROP TABLE private.users CASCADE;
CREATE TABLE private.users (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),

  "enabled" boolean NOT NULL DEFAULT TRUE,

  "roles" public.user_role[] NOT NULL DEFAULT '{user}'::public.user_role[],

  "email" varchar(256) NOT NULL,
  "phone" varchar(15) DEFAULT NULL,

  "password" bytea DEFAULT NULL, -- digest(_password, 'sha512')
  "2fa" bytea DEFAULT NULL,
  "certificate" bytea DEFAULT NULL,

  "oauth"    jsonb NOT NULL DEFAULT '{}'::jsonb,
  "profile"  jsonb NOT NULL DEFAULT '{}'::jsonb,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()), -- Момент создания

  CONSTRAINT private__users__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__users__check__roles CHECK ("roles" @> '{user}'::public.user_role[]),
  CONSTRAINT private__users__check__email CHECK (public.check_email("email")),
  CONSTRAINT private__users__check__phone CHECK (public.check_phone("phone")),
  CONSTRAINT private__users__check__password CHECK (octet_length("password") = 64),
  CONSTRAINT private__users__check__2fa CHECK (octet_length("2fa") = 32),
  CONSTRAINT private__users__check__oauth CHECK (jsonb_typeof("oauth") = 'object'),
  CONSTRAINT private__users__check__profile CHECK (jsonb_typeof("profile") = 'object')
);

SELECT private.init_trash_scope('private.users');

CREATE UNIQUE INDEX private__users__unique_idx__email ON private.users USING btree ("email");
CREATE UNIQUE INDEX private__users__unique_idx__phone ON private.users USING btree ("phone");

CREATE INDEX private__users__idx__enabled ON private.users USING btree ("enabled");
