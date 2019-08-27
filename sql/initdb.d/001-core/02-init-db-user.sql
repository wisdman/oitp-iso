CREATE FUNCTION private.init_db_user(_name text, _secretFile text) RETURNS void AS $$
DECLARE
  _secret text;
BEGIN
  _secretFile := quote_literal(_secretFile);

  CREATE TEMPORARY TABLE tmp_get_secret (ctn text) ON COMMIT DROP;
  EXECUTE 'COPY tmp_get_secret FROM ' || _secretFile;
  SELECT ctn INTO STRICT _secret FROM tmp_get_secret;
  DROP TABLE tmp_get_secret;

  EXECUTE 'CREATE ROLE "' || _name || '" WITH NOINHERIT LOGIN PASSWORD ''' || _secret || '''';
END; $$ LANGUAGE plpgsql VOLATILE STRICT;

-- IF NOT EXISTS (
--       SELECT                       -- SELECT list can stay empty for this
--       FROM   pg_catalog.pg_roles
--       WHERE  rolname = 'my_user') THEN

--       CREATE ROLE my_user LOGIN PASSWORD 'my_password';
--    END IF;