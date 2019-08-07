SET search_path = "$user";

-- DROP TYPE public.training_type CASCADE;
-- \dT+ public.training_type
SELECT private.create_enum_with_description('public.training_type', jsonb_build_object(
  'debug'   , 'Отладочная',
  'everyday', 'Ежедневная',
  'once'    , 'Разовая'
));
