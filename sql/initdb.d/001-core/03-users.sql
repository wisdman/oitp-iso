SELECT private.init_db_user('api-admin', '/run/secrets/api-admin');
ALTER ROLE "api-admin" SET search_path = "$user";
GRANT USAGE ON SCHEMA "admin" TO "api-admin";

SELECT private.init_db_user('api-public', '/run/secrets/api-public');
ALTER ROLE "api-public" SET search_path = "$user";
GRANT USAGE ON SCHEMA "public" TO "api-public";

SELECT private.init_db_user('api-self', '/run/secrets/api-self');
ALTER ROLE "api-self" SET search_path = "$user";
GRANT USAGE ON SCHEMA "self" TO "api-self";
