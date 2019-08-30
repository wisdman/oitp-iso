CREATE OR REPLACE FUNCTION private.new_session(_owner uuid, _ip inet, _fingerprint jsonb, OUT _session jsonb) AS $$
BEGIN
  INSERT INTO private.users_sessions AS s ("owner", "fingerprint")
  VALUES (_owner, _fingerprint || jsonb_build_object('ip', _ip))
  RETURNING jsonb_build_object(
    'id', s."id",
    'expires', to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
  ) INTO STRICT _session;
END; $$ LANGUAGE plpgsql VOLATILE;
