SET search_path = "$user";

-- DROP TYPE public.user_role CASCADE;
-- \dT+ public.user_role
SELECT private.create_enum_with_description('public.user_role', jsonb_build_object(
  'administrator', 'Администратор'     ,
  'instructor'   , 'Преподователь'     ,
  'manager'      , 'Руководитель школы',
  'user'         , 'Пользователь'
));
