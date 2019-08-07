SET search_path = "$user";

CREATE OR REPLACE FUNCTION self.init_session(_sessionKey char(64), _ip inet) RETURNS void AS $$
DECLARE
  _sessionUser text;
BEGIN
  UPDATE private.sessions AS s
  SET "ip" = _ip
  FROM private.allowed_users AS u
  WHERE u."id" = s."owner"
    AND u."deleted" IS NULL
    AND u."enabled"
    AND s."id" = _sessionKey
    AND s."login" <= timezone('UTC', now())
    AND s."logout" IS NULL
    AND s."expires" > timezone('UTC', now())
  RETURNING u."id" INTO STRICT _sessionUser;

  PERFORM set_config('app.sessionKey', _sessionKey, true);
  PERFORM set_config('app.sessionUser', _sessionUser, true);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.logout() RETURNS void AS $$
BEGIN
  UPDATE private.sessions AS s
  SET "logout" = timezone('UTC', now())
  WHERE s."id" = current_setting('app.sessionKey')::char(64);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_email(_email text, _password text, _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
BEGIN
  INSERT INTO private.sessions AS s("owner", "ip", "fingerprint")
    SELECT u."id", _ip, _fingerprint
    FROM private.users AS u
    WHERE u."email" = _email
      AND u."password" = digest(_password, 'sha512')
      AND u."deleted" IS NULL
      AND u."enabled"
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_otr(_id char(64), _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _user uuid;
BEGIN
  DELETE FROM private.users_otr
  WHERE "id" = _id
    AND "expires" > timezone('UTC', now())
  RETURNING "owner" INTO STRICT _user;

  INSERT INTO private.sessions AS s("owner", "ip", "fingerprint")
    SELECT u."id", _ip, _fingerprint
    FROM private.users AS u
    WHERE u."id" = _user
    AND u."deleted" IS NULL
    AND u."enabled"
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_sms(_id smallint, _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _user uuid;
BEGIN
  DELETE FROM private.users_sms
  WHERE "id" = _id
    AND "expires" > timezone('UTC', now())
  RETURNING "owner" INTO STRICT _user;

  INSERT INTO private.sessions AS s("owner", "ip", "fingerprint")
    SELECT u."id", _ip, _fingerprint
    FROM private.users AS u
    WHERE u."id" = _user
    AND u."deleted" IS NULL
    AND u."enabled"
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_invite(_id char(64), _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _email varchar(256);
  _master uuid;
  _user uuid;
BEGIN
  DELETE FROM private.invites
  WHERE "id" = _id
  RETURNING "email", "master" INTO STRICT _email, _master;

  INSERT INTO private.users("email") VALUES (_email)
  RETURNING "id" INTO STRICT _user;

  IF _master IS NOT NULL THEN
    INSERT INTO private.users_referals("master", "slave") VALUES (_master, _user);
  END IF;

  INSERT INTO private.sessions AS s("owner", "ip", "fingerprint")
  VALUES (_user, _ip, _fingerprint)
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

