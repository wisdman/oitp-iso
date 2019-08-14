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
