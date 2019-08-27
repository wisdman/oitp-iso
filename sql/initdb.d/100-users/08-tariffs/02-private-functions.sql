CREATE OR REPLACE FUNCTION private.get_user_tariff(_user uuid) RETURNS uuid AS $$
  SELECT "tariff" FROM private.users_tariffs WHERE "owner" = _user ORDER BY "ts" DESC LIMIT 1
$$ LANGUAGE sql VOLATILE STRICT;
