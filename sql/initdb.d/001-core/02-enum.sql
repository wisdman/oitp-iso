CREATE OR REPLACE FUNCTION private.create_enum_with_description(_name text, _object jsonb) RETURNS void AS $$
DECLARE
  _createEnumCommand text;
  _createDescriptionCommand text;
BEGIN
  ASSERT _name  LIKE '%_._%', 'Incorrecy ENIUM name. Use <schema>.<name>.';

  SELECT
    format(
      'CREATE TYPE %s AS ENUM (%s)', _name,
      string_agg(quote_literal("key"), ', ' order by "key")
    ),
    format(
      E'COMMENT ON TYPE %s IS \$\$%s\$\$', _name,
      string_agg("value", E'\n' order by "key")
    )
  INTO STRICT _createEnumCommand, _createDescriptionCommand FROM jsonb_each_text(_object);
  EXECUTE _createEnumCommand;
  EXECUTE _createDescriptionCommand;

  EXECUTE format(E'CREATE OR REPLACE FUNCTION public.check_%s(_value text) RETURNS bool AS \$\$\nSELECT _value::text = any(enum_range(null::%s)::text[])\n\$\$ LANGUAGE sql IMMUTABLE STRICT', (regexp_split_to_array(_name,'\.'))[2], _name);
END;
$$ LANGUAGE plpgsql VOLATILE;
