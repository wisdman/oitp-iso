CREATE OR REPLACE FUNCTION self.new_invite_by_email(_email varchar(256)) RETURNS void AS $$
  SELECT public.new_invite_by_email(_email);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;
