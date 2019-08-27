CREATE OR REPLACE FUNCTION public.check_color(_value varchar(7)) RETURNS bool AS $$
  SELECT _value ~ '^#[0-9a-f]{6}$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_email(_value varchar(256)) RETURNS bool AS $$
  SELECT _value ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]*[a-z0-9]$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_phone(_value varchar(15)) RETURNS bool AS $$
  SELECT _value ~ '^[0-9]{11,15}$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_unique_id(_value char(64)) RETURNS bool AS $$
  SELECT _value ~ '^[0-9a-f]{64}$'
$$ LANGUAGE sql IMMUTABLE STRICT;
