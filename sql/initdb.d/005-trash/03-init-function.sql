CREATE OR REPLACE FUNCTION private.init_trash_scope(_name text) RETURNS void AS $$
DECLARE
  _createTrashTableCommand text;
BEGIN
  ASSERT _name LIKE '%_._%',
  'Incorrecy TABLE name. Use <schema>.<name>.';

  ASSERT EXISTS (SELECT 1 FROM information_schema.tables WHERE (table_schema ||'.'|| table_name) = _name),
  'TABLE does not exists';

  SELECT
    format(
      'CREATE TABLE trash.%s() INHERITS (%s, private.trash)',
      replace(_name, '.', '__'), _name
    )
  INTO STRICT _createTrashTableCommand;
  EXECUTE _createTrashTableCommand;
END;
$$ LANGUAGE plpgsql VOLATILE;
