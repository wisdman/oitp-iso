CREATE OR REPLACE FUNCTION private.msg_sms(
  _template public.msg_template_id,
  _phone varchar(15),
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO msg.sms("to", "template", "data")
  VALUES ( _phone, _template, _data)
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_sms, 'NEW';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
