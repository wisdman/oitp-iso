CREATE OR REPLACE FUNCTION public.check_config_key(_value varchar(64)) RETURNS bool AS $$
  SELECT _value ~ '^[a-z][0-9a-zA-Z]+$'
$$ LANGUAGE sql IMMUTABLE STRICT;