
ALTER ROLE "api-admin" LOGIN PASSWORD 'ADMIN-P@Ssw0rd';
ALTER ROLE "api-crone" LOGIN PASSWORD 'CRONE-P@Ssw0rd';
ALTER ROLE "api-public" LOGIN PASSWORD 'API-P@Ssw0rd';

INSERT INTO private.tariffs("title","default","amount") VALUES ('Помесячно', true, 500000);

INSERT INTO private.users ("email", "password") VALUES
  ('wisdman@wisdman.io','\x72edc57fc813a9b94c5cda60b42aac404031a4dc76219c16793fe69c7bb19adef5dbfbec9423d1dad09fc4ea47e2c2a704f7e2ee61b473218df25150898f3178'),
  ('89530500002@mail.ru','\x1a21a8d6ec884aa5bec81b18a600fcb5df63f3db3fc6ff72213975d0ce68026aec5df4371273039ab9f3b003cb2fcd20b5de1d630f8aa1abff075c2a3287de1d'),
  ('a9126000812@gmail.com','\xb2e719dc168080d4977e54c9caa703ed1fc631b74ecded9987c7059bfdfb7bc0db8df61bc4a9ae28f544039ec30ac61de30d457cb384d3c1fc33fd753cadbcd5');
