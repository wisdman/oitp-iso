SET search_path = "$user";

CREATE OR REPLACE FUNCTION public.random(low INT ,high INT) RETURNS int AS $$
BEGIN
  RETURN floor(random()* (high-low + 1) + low);
END; $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION public.unique_id() RETURNS char(128) AS $$
BEGIN
  RETURN encode(digest(uuid_generate_v1mc()::text || uuid_generate_v4()::text, 'sha512'), 'hex')::char(128);
END; $$ LANGUAGE plpgsql VOLATILE;
