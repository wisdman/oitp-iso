
ALTER ROLE "api-admin" LOGIN PASSWORD 'ADMIN-P@Ssw0rd';
ALTER ROLE "api-cron" LOGIN PASSWORD 'CRONE-P@Ssw0rd';
ALTER ROLE "api-public" LOGIN PASSWORD 'PUBLIC-P@Ssw0rd';
ALTER ROLE "api-self" LOGIN PASSWORD 'SELF-P@Ssw0rd';

INSERT INTO private.users ("email", "password") VALUES
  ('wisdman@wisdman.io','\x72edc57fc813a9b94c5cda60b42aac404031a4dc76219c16793fe69c7bb19adef5dbfbec9423d1dad09fc4ea47e2c2a704f7e2ee61b473218df25150898f3178'),
  ('89530500002@mail.ru','\x1a21a8d6ec884aa5bec81b18a600fcb5df63f3db3fc6ff72213975d0ce68026aec5df4371273039ab9f3b003cb2fcd20b5de1d630f8aa1abff075c2a3287de1d');

INSERT INTO private.users("profile", "email", "password") VALUES
 ('{"surname":"Реданских"      , "name":"Маргарита Николаевна"   , "location":"Нижний Тагил"   }'::jsonb , lower('redanskikh.m@yandex.ru'  ) , digest('PH5j2F6', 'sha512')),
 ('{"surname":"Толстова"       , "name":"Татьяна Николаевна"     , "location":"Стерлитамак"    }'::jsonb , lower('zakaz@chitai-str.ru'     ) , digest('eMLdDQh', 'sha512')),
 ('{"surname":"Борисова"       , "name":"Алла Эдуардовна"        , "location":"Кунцево"        }'::jsonb , lower('director@pokolenieltd.ru') , digest('rxnFFwX', 'sha512')),
 ('{"surname":"Иваникова"      , "name":"Светлана Михайловна"    , "location":"Ставрополь"     }'::jsonb , lower('s.ivanikova@mail.ru'     ) , digest('v6HfE2f', 'sha512')),
 ('{"surname":"Мушникова"      , "name":"Ирина Геннадьевна"      , "location":"Ростов-на-Дону" }'::jsonb , lower('chitai.rnd@mail.ru'      ) , digest('e7rW3Jf', 'sha512')),
 ('{"surname":"Мершина"        , "name":"Наталья Юрьевна"        , "location":"Киров"          }'::jsonb , lower('9091382722@mail.ru'      ) , digest('9uTX4M9', 'sha512')),
 ('{"surname":"Карпова"        , "name":"Марина Леонидовна"      , "location":"Москва"         }'::jsonb , lower('karpova-ml@mail.ru'      ) , digest('VBebJzK', 'sha512')),
 ('{"surname":"Паняк"          , "name":"Марина Васильевна"      , "location":"Москва"         }'::jsonb , lower('panyak@mail.ru'          ) , digest('Mqza2Ma', 'sha512')),
 ('{"surname":"Конькова"       , "name":"Алена Сергеевна"        , "location":"Магнитогорск"   }'::jsonb , lower('alyona-konkova@yandex.ru') , digest('hTF6NCL', 'sha512')),
 ('{"surname":"Свалова"        , "name":"Юлиана Сергеевна"       , "location":"Екатеринбург"   }'::jsonb , lower('juliana88@yandex.ru'     ) , digest('6pNFNfA', 'sha512')),
 ('{"surname":"Шутова"         , "name":"Ольга Валерьевна"       , "location":"Пермь"          }'::jsonb , lower('intell-iq@mail.ru'       ) , digest('HAZGFnx', 'sha512')),
 ('{"surname":"Хафизова"       , "name":"Аинагуль Токтаровна"    , "location":"Астаны"         }'::jsonb , lower('aina_hat@mail.ru'        ) , digest('LyQKFzQ', 'sha512')),
 ('{"surname":"Попп"           , "name":"Татьяна Викторовна"     , "location":"Екатеринбург"   }'::jsonb , lower('tpopp@yandex.ru'         ) , digest('UMbXmhw', 'sha512')),
 ('{"surname":"Мингазетдинова" , "name":"Татьяна Александровна"  , "location":"Ноябрьск"       }'::jsonb , lower('tatyanka1987@gmail.com'  ) , digest('DxhcjcQ', 'sha512')),
 ('{"surname":"Нагаева"        , "name":"Разиля Адгамовна"       , "location":"Первоуральск"   }'::jsonb , lower('nagaeva@e1.ru'           ) , digest('Ag9yreG', 'sha512')),
 ('{"surname":"Романова"       , "name":"Анна Валентиновна"      , "location":"Озерск"         }'::jsonb , lower('jenya218@inbox.ru'       ) , digest('kqaMyTK', 'sha512')),
 ('{"surname":"Комарова"       , "name":"Светлана Михайловна"    , "location":"Одинцово"       }'::jsonb , lower('smk88880@icloud.com'     ) , digest('PGdSM7M', 'sha512')),
 ('{"surname":"Иванова"        , "name":"Елена Сергеевна"        , "location":"Санкт-Петербург"}'::jsonb , lower('chitaispb@gmail.com'     ) , digest('VBT7Ah5', 'sha512')),
 ('{"surname":"Филинских"      , "name":"Татьяна"                , "location":"Челябинск"      }'::jsonb , lower('svada13@gmail.com'       ) , digest('L5cbcyg', 'sha512')),
 ('{"surname":"Каримова"       , "name":"Регина"                 , "location":"Уфа"            }'::jsonb , lower('chitai-ufa@yandex.ru'    ) , digest('jZ2yezZ', 'sha512')),
 ('{"surname":"Андреева"       , "name":"Татьяна Алексеевна"     , "location":"Среднеуральск"  }'::jsonb , lower('t.andreeva20000@mail.ru' ) , digest('YuR5WQe', 'sha512')),
 ('{"surname":"Рючина"         , "name":"Ольга Львовна"          , "location":"Дегтярск"       }'::jsonb , lower('rolvovna@yahoo.com'      ) , digest('NaLF6Hp', 'sha512')),
 ('{"surname":"Самарская"      , "name":"Елена Юрьевна"          , "location":"Самара"         }'::jsonb , lower('elena-samarskaya@bk.ru'  ) , digest('Pu3nkPc', 'sha512')),
 ('{"surname":"Лобанова"       , "name":"Ангелина Викторовна"    , "location":"Ярославль"      }'::jsonb , lower('straxovka2012@yandex.ru' ) , digest('qww8TCT', 'sha512')),
 ('{"surname":"Оконешникова"   , "name":"Вероника Александровна" , "location":"Якутск"         }'::jsonb , lower('Saluscare@mail.ru'       ) , digest('MmTEEtJ', 'sha512')),
 ('{"surname":"Мурзина"        , "name":"Гульназ Илюсовна"       , "location":"Златоуст"       }'::jsonb , lower('chitaizlat@yandex.ru'    ) , digest('BW55TuN', 'sha512')),
 ('{"surname":"Олифиренко"     , "name":"Татьяна Николаевна"     , "location":"Москва"         }'::jsonb , lower('rost-intellekta@mail.ru' ) , digest('hDZzXLm', 'sha512'));

VLLSchool - Регистрация
Вы успешно зарегистрированы в Школе Скорочтения Васильевой ЛЛ - Online
E-mail:
Пароль: