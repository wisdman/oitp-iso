-- DROP TYPE public.training_type CASCADE;
SELECT private.create_enum_with_description('public.training_type', jsonb_build_object(
  'debug'   , 'Отладочная',
  'everyday', 'Ежедневная',
  'once'    , 'Разовая'
));
