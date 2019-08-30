CREATE SCHEMA IF NOT EXISTS payment;
REVOKE ALL PRIVILEGES ON SCHEMA payment FROM PUBLIC;

SELECT private.init_db_user('api-payment', '/run/secrets/api-payment');
ALTER ROLE "api-payment" SET search_path = "$user";
GRANT USAGE ON SCHEMA "payment" TO "api-payment";

SELECT private.init_db_user('daemon-payment', '/run/secrets/daemon-payment');
ALTER ROLE "daemon-payment" SET search_path = "$user";
GRANT USAGE ON SCHEMA "payment" TO "daemon-payment";
