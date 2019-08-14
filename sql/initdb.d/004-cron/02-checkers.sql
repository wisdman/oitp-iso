CREATE OR REPLACE FUNCTION private.is_cron_function(_proname name) RETURNS boolean AS $$
  SELECT EXISTS(SELECT 1 FROM pg_proc WHERE proname = _proname AND pronamespace = 'cron'::regnamespace)
$$ LANGUAGE sql;