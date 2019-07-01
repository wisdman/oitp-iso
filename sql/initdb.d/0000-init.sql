SET search_path = "$user";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS "pgcrypto"  WITH SCHEMA pg_catalog;

CREATE SCHEMA IF NOT EXISTS admin;
CREATE SCHEMA IF NOT EXISTS private;
CREATE SCHEMA IF NOT EXISTS public;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;

CREATE ROLE "api-admin" WITH NOINHERIT NOLOGIN PASSWORD NULL;
ALTER ROLE "api-admin" SET search_path = "$user";

CREATE ROLE "api-crone" WITH NOINHERIT NOLOGIN PASSWORD NULL;
ALTER ROLE "api-crone" SET search_path = "$user";

CREATE ROLE "api-public" WITH NOINHERIT NOLOGIN PASSWORD NULL;
ALTER ROLE "api-public" SET search_path = "$user";