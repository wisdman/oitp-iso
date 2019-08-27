
-- CREATE OR REPLACE FUNCTION public.login_by_invite(_id char(64), _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
-- DECLARE
--   _email varchar(256);
--   _master uuid;
--   _user uuid;
-- BEGIN
--   DELETE FROM private.invites
--   WHERE "id" = _id
--   RETURNING "email", "master" INTO STRICT _email, _master;

--   INSERT INTO private.users("email") VALUES (_email)
--   RETURNING "id" INTO STRICT _user;

--   IF _master IS NOT NULL THEN
--     INSERT INTO private.users_referals("master", "slave") VALUES (_master, _user);
--   END IF;

--   INSERT INTO private.sessions AS s("owner", "ip", "fingerprint")
--   VALUES (_user, _ip, _fingerprint)
--   RETURNING jsonb_build_object(
--     'id', s."id",
--     'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
--   ) INTO STRICT _session;
-- END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

