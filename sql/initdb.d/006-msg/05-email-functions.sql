CREATE OR REPLACE FUNCTION private.msg_email(
  _template public.msg_template_id,
  _email varchar(256),
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO msg.email("to", "toName", "template", "data")
  VALUES ( _email, coalesce(_data->>'name', ''), _template, _data)
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_email, 'NEW';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
