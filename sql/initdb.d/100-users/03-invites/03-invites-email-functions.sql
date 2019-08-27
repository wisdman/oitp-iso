CREATE OR REPLACE FUNCTION public.new_invite(_email varchar(256)) RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM private.users WHERE "email" = _email) THEN
    RAISE 'Incorrect email or password' USING ERRCODE = 'A0409';
  END IF;

  INSERT INTO private.users_invites_email("email", "master") VALUES (_email, current_setting('app.sessionUser', true)::uuid);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.new_invite(_email varchar(256)) RETURNS void AS $$
  SELECT public.new_invite(_email);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;
