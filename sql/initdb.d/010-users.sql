SET search_path = "$user";

CREATE TYPE public.users__role AS ENUM (
  'administrator',
  'user'
);

CREATE TABLE private.users (
  "id"          uuid          NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled"     boolean       NOT NULL DEFAULT TRUE,
  "deleted"     boolean       NOT NULL DEFAULT FALSE,
  "roles"       public.users__role[] NOT NULL DEFAULT '{user}'::public.users__role[],

  "email"       varchar(256)  NOT NULL,
  "phone"       varchar(15)   DEFAULT NULL,

  "password"    bytea         NOT NULL,
  "oauth"       jsonb         NOT NULL DEFAULT '{}'::jsonb,

  "name"        text          NOT NULL DEFAULT '',
  "image"       oid           DEFAULT NULL,
  "birthday"    timestamp without time zone NOT NULL,

  CONSTRAINT users__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT users__check__email CHECK ("email" ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),
  CONSTRAINT users__check__phone CHECK ("phone" ~ '^[0-9]{11,15}$'),

  CONSTRAINT users__check__password CHECK (octet_length("password") = 64),

  CONSTRAINT users__check__oauth  CHECK ("oauth"::text ~ '^{')
) WITH (OIDS = FALSE);

-- Check unique indexes
CREATE UNIQUE INDEX users__idx__unique_email ON private.users USING btree ("email");
CREATE UNIQUE INDEX users__idx__unique_phone ON private.users USING btree ("phone");
