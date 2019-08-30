CREATE OR REPLACE FUNCTION public.new_sms(_phone varchar(15), _options jsonb) RETURNS void AS $$
DECLARE
  _user uuid;
BEGIN
  SELECT "id" INTO STRICT _user
  FROM ONLY private.users
  WHERE "phone" = _phone
    AND u."enabled";

  INSERT INTO private.users_sms("owner", "options") VALUES (_user, _options);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.login_by_sms(_id smallint, _fingerprint jsonb, OUT _session jsonb) AS $$
DECLARE
  _user uuid;
BEGIN
  DELETE FROM private.users_sms
  WHERE "id" = _id
    AND "ts" <= timezone('UTC', now())
    AND "expires" > timezone('UTC', now())
  RETURNING "owner" INTO STRICT _user;

  _session := private.new_session(_user, _ip, _fingerprint);
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
