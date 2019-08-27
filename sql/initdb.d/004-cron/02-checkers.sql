CREATE OR REPLACE FUNCTION public.is_cron_function(_proname name) RETURNS boolean AS $$
  SELECT EXISTS(SELECT 1 FROM pg_proc WHERE proname = _proname AND pronamespace = 'cron'::regnamespace)
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION public.check_crontab_moment(_value varchar(13)) RETURNS bool AS $$
  SELECT _value ~ '^([0-9]|[1-5][0-9]|\*)\s([0-9]|1[0-9]|2[0-3]|\*)\s([1-9]|[1-2][0-9]|3[0-1]|\*)\s([1-9]|1[0-2]|\*)\s([0-6]|\*)$'
$$ LANGUAGE sql IMMUTABLE STRICT;