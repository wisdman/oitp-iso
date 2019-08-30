CREATE OR REPLACE FUNCTION public.is_email_exists(_email varchar(256)) RETURNS bool AS $$
BEGIN
  IF EXISTS( SELECT 1 FROM private.users WHERE "email" = _email) THEN
    RETURN TRUE;
  END IF;
  RETURN FALSE;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
