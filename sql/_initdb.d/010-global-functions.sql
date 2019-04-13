SET statement_timeout = 0;
SET lock_timeout = 0;
SET search_path = public;

CREATE FUNCTION prevent_change_id() RETURNS trigger AS $$
BEGIN
  IF (OLD."id" <> NEW."id") THEN
    RAISE EXCEPTION '"id" can not be changed' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_hash(text) RETURNS char(128) AS $$
  SELECT encode(digest($1, 'sha512'), 'hex')::char(128);
$$ LANGUAGE SQL IMMUTABLE;

CREATE FUNCTION get_unique_id() RETURNS char(128) AS $$
  SELECT get_hash(uuid_generate_v1()::text || uuid_generate_v4()::text)::char(128);
$$ LANGUAGE SQL VOLATILE;
