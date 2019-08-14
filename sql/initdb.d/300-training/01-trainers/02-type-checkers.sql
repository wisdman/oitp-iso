CREATE OR REPLACE FUNCTION public.check_trainer_type_array(_value jsonb) RETURNS bool AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM (SELECT jsonb_array_elements_text("value") AS "value" FROM jsonb_array_elements(_value)) AS t
    WHERE public.check_trainer_type("value") = FALSE
  )
$$ LANGUAGE sql IMMUTABLE STRICT;
