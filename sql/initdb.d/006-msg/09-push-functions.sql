CREATE OR REPLACE FUNCTION private.msg_push(
  _template public.msg_template_id,
  _recipient uuid,
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO msg.sms("to", "template", "data")
  VALUES ( _recipient, _template, _data)
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_push, 'NEW';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
