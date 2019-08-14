CREATE OR REPLACE FUNCTION public.is_email_exists(_email varchar(256), OUT _result jsonb) AS $$
BEGIN
  SELECT jsonb_build_object('status', TRUE) INTO STRICT _result
  FROM private.users AS u
  WHERE u."email" = _email;
  EXCEPTION
    WHEN no_data_found THEN
      _result := jsonb_build_object('status', FALSE);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
