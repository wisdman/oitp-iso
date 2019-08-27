CREATE OR REPLACE FUNCTION public.random(low smallint ,high smallint) RETURNS smallint AS $$
  SELECT floor(random()* (high-low + 1) + low)::smallint
$$ LANGUAGE sql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION public.random(low int ,high int) RETURNS int AS $$
  SELECT floor(random()* (high-low + 1) + low)::int
$$ LANGUAGE sql VOLATILE STRICT;

CREATE OR REPLACE FUNCTION public.unique_id() RETURNS char(64) AS $$
  SELECT encode(digest(uuid_generate_v1mc()::text || uuid_generate_v4()::text, 'sha256'), 'hex')::char(64)
$$ LANGUAGE sql VOLATILE STRICT;
