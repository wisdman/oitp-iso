CREATE OR REPLACE FUNCTION public.new_invite_by_email(_email varchar(256)) RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM private.users WHERE "email" = _email) THEN
    RAISE 'User already registered' USING ERRCODE = 'A0409';
  END IF;

  INSERT INTO private.users_invites_email("email", "master")
  VALUES (_email, current_setting('app.sessionUser', true)::uuid);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_invite_email(_id char(64), _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _email varchar(256);
  _master uuid;
  _user uuid;
BEGIN
  SELECT "owner", "email", "master" INTO _user, _email, _master
  FROM private.users_invites_email WHERE id = _id;

  IF NOT FOUND THEN
    RAISE 'Incorrect invite' USING ERRCODE = 'A0404';
  END IF;

  IF _user IS NOT NULL THEN
    _session := private.new_session(_user, _ip, _fingerprint);
    RETURN;
  END IF;

  IF public.is_email_exists(_email) THEN
    RAISE 'User already registered' USING ERRCODE = 'A0409';
  END IF;

  INSERT INTO private.users("email") VALUES (_email)
  RETURNING "id" INTO STRICT _user;

  IF _master IS NOT NULL THEN
    INSERT INTO private.users_relations("master", "slave") VALUES (_master, _user);
  END IF;

  UPDATE private.users_invites_email
  SET "owner" = _user
  WHERE id = _id;

  _session := private.new_session(_user, _ip, _fingerprint);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
