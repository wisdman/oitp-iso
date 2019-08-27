CREATE OR REPLACE FUNCTION public.random_sms_code() RETURNS smallint AS $$
  SELECT public.random(10000, 99999)::smallint
$$ LANGUAGE sql VOLATILE STRICT;