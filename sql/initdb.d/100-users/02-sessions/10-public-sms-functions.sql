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

  INSERT INTO  private.users_sessions AS s("owner", "ip", "fingerprint")
    SELECT u."id", _ip, _fingerprint
    FROM ONLY private.users AS u
    WHERE u."id" = _user
      AND u."enabled"
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
