SET search_path = "$user";

-- DROP TYPE public.users_role CASCADE;
-- \dT+ public.users_role
SELECT private.create_enum_with_description('public.users_role', jsonb_build_object(
  'administrator', 'Администратор'     ,
  'instructor'   , 'Преподователь'     ,
  'manager'      , 'Руководитель школы',
  'user'         , 'Пользователь'
));
