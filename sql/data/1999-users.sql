
ALTER ROLE "api-admin" LOGIN PASSWORD 'ADMIN-P@Ssw0rd';
ALTER ROLE "api-crone" LOGIN PASSWORD 'CRONE-P@Ssw0rd';
ALTER ROLE "api-public" LOGIN PASSWORD 'API-P@Ssw0rd';

INSERT INTO private.tariffs("title","default","amount") VALUES ('Помесячно', true, 500000);

INSERT INTO private.users ("email", "password") VALUES
  ('wisdman@wisdman.io','\x72edc57fc813a9b94c5cda60b42aac404031a4dc76219c16793fe69c7bb19adef5dbfbec9423d1dad09fc4ea47e2c2a704f7e2ee61b473218df25150898f3178');
