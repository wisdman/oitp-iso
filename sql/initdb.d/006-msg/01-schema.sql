CREATE SCHEMA IF NOT EXISTS msg;
REVOKE ALL PRIVILEGES ON SCHEMA msg FROM PUBLIC;

SELECT private.init_db_user('daemon-msg', '/run/secrets/daemon-msg');
ALTER ROLE "daemon-msg" SET search_path = "$user";
GRANT USAGE ON SCHEMA "msg" TO "daemon-msg";
