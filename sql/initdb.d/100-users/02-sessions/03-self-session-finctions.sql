CREATE OR REPLACE FUNCTION self.init_session(_sessionKey char(64), _ip inet) RETURNS bool AS $$
DECLARE
  _sessionUser text;
BEGIN
  UPDATE private.users_sessions AS s
  SET "fingerprint" = "fingerprint" || jsonb_build_object('ip', _ip)
  FROM ONLY private.users AS u
  WHERE u."id" = s."owner"
    AND u."enabled"
    AND s."id" = _sessionKey
    AND s."ts" <= timezone('UTC', now())
    AND s."expires" > timezone('UTC', now())
  RETURNING u."id" INTO STRICT _sessionUser;

  PERFORM set_config('app.sessionKey', _sessionKey, true);
  PERFORM set_config('app.sessionUser', _sessionUser, true);

  RETURN TRUE;
  EXCEPTION
    WHEN no_data_found THEN
      RETURN FALSE;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.logout() RETURNS void AS $$
BEGIN
  DELETE FROM private.users_sessions
  WHERE s."id" = current_setting('app.sessionKey')::char(64);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
