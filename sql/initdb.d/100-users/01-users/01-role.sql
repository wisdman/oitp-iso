-- DROP TYPE public.user_role CASCADE;
SELECT private.create_enum_with_description('public.user_role', jsonb_build_object(
  'administrator', 'Администратор'     ,
  'instructor'   , 'Преподователь'     ,
  'manager'      , 'Руководитель школы',
  'user'         , 'Пользователь'
));
