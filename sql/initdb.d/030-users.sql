SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

-- Users roles
CREATE TYPE users__role AS ENUM (
  'administrator',
  'methodist',
  'instructor',
  'user'
);

-- Users datatable
CREATE TABLE users (
  "id"          uuid          NOT NULL DEFAULT uuid_generate_v1(),
  "enabled"     boolean       NOT NULL DEFAULT TRUE,
  "deleted"     boolean       NOT NULL DEFAULT FALSE,
  "roles"       users__role[] NOT NULL DEFAULT '{user}'::users__role[],

  "email"       varchar(256)  NOT NULL,
  "phone"       varchar(15)   DEFAULT NULL,

  "password"    char(128)     NOT NULL,
  "oauth"       jsonb         NOT NULL DEFAULT '{}'::jsonb,

  "image"       oid           DEFAULT NULL,

  "name"        text          DEFAULT '',

  CONSTRAINT users__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT users__check__email CHECK ("email" ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),
  CONSTRAINT users__check__phone CHECK ("phone" ~ '^[0-9]{11,15}$'),

  CONSTRAINT users__check__password CHECK ("password" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT users__check__oauth  CHECK ("oauth"::text ~ '^{')
) WITH (OIDS = FALSE);

-- Check unique indexes
CREATE UNIQUE INDEX users__idx__unique_email ON users USING btree ("email");
CREATE UNIQUE INDEX users__idx__unique_phone ON users USING btree ("phone");

-- Prevent change id
CREATE TRIGGER users__prevent_change_id__trigger
  BEFORE UPDATE ON users FOR EACH ROW
  EXECUTE PROCEDURE prevent_change_id();

-- Scann indexes
CREATE INDEX users__idx__enabled ON users USING btree("enabled");
CREATE INDEX users__idx__deleted ON users USING btree("deleted");
CREATE INDEX users__idx__roles ON users USING gin("roles");
