SET search_path = "$user";

CREATE OR REPLACE FUNCTION public.new_otr(_email varchar(256), _options jsonb) RETURNS void AS $$
DECLARE
  _user uuid;
BEGIN
  SELECT "id" INTO STRICT _user
  FROM private.users
  WHERE "email" = _email
    AND u."deleted" IS NULL
    AND u."enabled";

  INSERT INTO private.users_otr("owner", "options") VALUES (_user, _options);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.new_otr(_options jsonb) RETURNS void AS $$
  INSERT INTO private.users_otr("owner", "options") VALUES (current_setting('app.sessionUser')::uuid, _options);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.new_sms(_phone varchar(15), _options jsonb) RETURNS void AS $$
DECLARE
  _user uuid;
BEGIN
  SELECT "id" INTO STRICT _user
  FROM private.users
  WHERE "phone" = _phone
    AND u."deleted" IS NULL
    AND u."enabled";

  INSERT INTO private.users_sms("owner", "options") VALUES (_user, _options);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.new_sms(_options jsonb) RETURNS void AS $$
  INSERT INTO private.users_sms("owner", "options") VALUES (current_setting('app.sessionUser')::uuid, _options);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.new_invite(_email varchar(256)) RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM private.users WHERE "email" = _email) THEN
    RAISE unique_violation USING MESSAGE = 'User with email "' || _email || '" already exists';
  END IF;

  INSERT INTO private.invites("email", "master") VALUES (_email, current_setting('app.sessionUser', true)::uuid);
  -- EXCEPTION
  --  WHEN division_by_zero THEN
  --  DELETE FROM private.invites WHERE "email" = _email;
  --  INSERT INTO private.invites("email") VALUES (_email);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.new_invite(_email varchar(256)) RETURNS void AS $$
  SELECT public.new_invite(_email);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;

