SET search_path = "$user";

-- Generators --

CREATE OR REPLACE FUNCTION public.random(low smallint ,high smallint) RETURNS smallint AS $$
  SELECT floor(random()* (high-low + 1) + low)::smallint
$$ LANGUAGE sql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION public.random(low int ,high int) RETURNS int AS $$
  SELECT floor(random()* (high-low + 1) + low)::int
$$ LANGUAGE sql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION public.random_sms_code() RETURNS smallint AS $$
  SELECT public.random(10000, 99999)::smallint
$$ LANGUAGE sql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION public.unique_id() RETURNS char(64) AS $$
  SELECT encode(digest(uuid_generate_v1mc()::text || uuid_generate_v4()::text, 'sha256'), 'hex')::char(64)
$$ LANGUAGE sql VOLATILE STRICT;


-- Checkers --

CREATE OR REPLACE FUNCTION public.check_color(_value varchar(7)) RETURNS bool AS $$
  SELECT _value ~ '^#[0-9a-f]{6}$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_email(_value varchar(256)) RETURNS bool AS $$
  SELECT _value ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]*[a-z0-9]$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_mime(_value text) RETURNS bool AS $$
  SELECT _value ~ '^[a-z0-9][a-z0-9-]*\/[a-z0-9-]*[a-z0-9]$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_phone(_value varchar(15)) RETURNS bool AS $$
  SELECT _value ~ '^[0-9]{11,15}$'
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_sms_code(_value smallint) RETURNS bool AS $$
  SELECT _value >= 10000 AND _value <= 99999
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION public.check_unique_id(_value char(64)) RETURNS bool AS $$
  SELECT _value ~ '^[0-9a-f]{64}$'
$$ LANGUAGE sql IMMUTABLE STRICT;
