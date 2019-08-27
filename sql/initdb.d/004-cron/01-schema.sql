CREATE SCHEMA IF NOT EXISTS cron;
REVOKE ALL PRIVILEGES ON SCHEMA cron FROM PUBLIC;

SELECT private.init_db_user('daemon-cron', '/run/secrets/daemon-cron');
ALTER ROLE "daemon-cron" SET search_path = "$user";
GRANT USAGE ON SCHEMA "cron" TO "daemon-cron";
