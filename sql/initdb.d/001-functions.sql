SET search_path = "$user";

CREATE OR REPLACE FUNCTION public.random_range(low INT ,high INT)
RETURNS INT AS $$
BEGIN
  RETURN floor(random()* (high-low + 1) + low);
END;
$$ LANGUAGE plpgsql VOLATILE;