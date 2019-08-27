CREATE OR REPLACE FUNCTION public.check_sms_code(_value smallint) RETURNS bool AS $$
  SELECT _value >= 10000 AND _value <= 99999
$$ LANGUAGE sql IMMUTABLE STRICT;