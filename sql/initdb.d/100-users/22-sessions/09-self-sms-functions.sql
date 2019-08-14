CREATE OR REPLACE FUNCTION self.new_sms(_options jsonb) RETURNS void AS $$
  INSERT INTO private.users_sms("owner", "options") VALUES (current_setting('app.sessionUser')::uuid, _options);
$$ LANGUAGE sql VOLATILE SECURITY DEFINER;
