CREATE OR REPLACE FUNCTION public.check_mime(_value text) RETURNS bool AS $$
  SELECT _value ~ '^[a-z0-9][a-z0-9-]*\/[a-z0-9-]*[a-z0-9]$'
$$ LANGUAGE sql IMMUTABLE STRICT;