CREATE OR REPLACE FUNCTION public.get_config(_key varchar(32), OUT _value jsonb) AS $$
BEGIN
  SELECT "value" INTO STRICT _value
  FROM private.config
  WHERE "key" = _key
    AND NOT "secure";
END;
$$ LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;