CREATE OR REPLACE FUNCTION private.get_config(_key varchar(32), OUT _value jsonb) AS $$
BEGIN
  SELECT "value" INTO STRICT _value
  FROM private.config
  WHERE "key" = _key;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION private.get_config_as_text(_key varchar(32), OUT _value text) AS $$
BEGIN
  SELECT "value"::text INTO STRICT _value
  FROM private.config
  WHERE "key" = _key;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;
