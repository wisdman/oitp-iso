CREATE OR REPLACE FUNCTION public.new_otr(_email varchar(256), _options jsonb) RETURNS void AS $$
DECLARE
  _user uuid;
BEGIN
  SELECT "id" INTO STRICT _user
  FROM ONLY private.users
  WHERE "email" = _email
    AND u."enabled";

  INSERT INTO private.users_otr("owner", "options") VALUES (_user, _options);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_otr(_id char(64), _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _user uuid;
BEGIN
  DELETE FROM private.users_otr
  WHERE "id" = _id
    AND "ts" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now())
  RETURNING "owner" INTO STRICT _user;

  _session := private.new_session(_user, _ip, _fingerprint);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
