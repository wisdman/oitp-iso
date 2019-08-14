CREATE OR REPLACE FUNCTION public.login_by_email(_email text, _password text, _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
BEGIN
  INSERT INTO private.users_sessions AS s("owner", "fingerprint")
    SELECT u."id", _fingerprint || jsonb_build_object('ip', _ip)
    FROM ONLY private.users AS u
    WHERE u."email" = _email
      AND u."password" = digest(_password, 'sha512')
      AND u."enabled"
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
  EXCEPTION
    WHEN no_data_found THEN
      _session := jsonb_build_object('error', 1404, 'message', 'Incorrect email or password');
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
