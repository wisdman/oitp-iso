INSERT INTO private.tariffs("title", "amount", "interval", "public", "default") VALUES
  ('Клубный'    ,  300000, '1 mon'  , FALSE, FALSE),
  ('Клубный'    , 3000000, '1 year' , FALSE, FALSE),
  ('Стандартный',  500000, '1 mon'  , TRUE , TRUE ),
  ('Стандартный', 5000000, '1 year' , TRUE , FALSE),
  ('VIP'        ,  800000, '1 mon'  , TRUE , FALSE),
  ('VIP'        , 8000000, '1 year' , TRUE , FALSE),
  ('Школа'      ,       0, '99 year', FALSE, FALSE),
  ('Педагог'    ,       0, '99 year', FALSE, FALSE),
  ('Учащийся'   ,       0, '6 mon'  , FALSE, FALSE);

