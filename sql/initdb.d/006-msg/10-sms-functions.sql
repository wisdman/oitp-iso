CREATE OR REPLACE FUNCTION private.msg_sms(
  _template public.msg_template_id,
  _phone varchar(15),
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO msg.sms("to", "template", "version", "data")
    SELECT _phone, "template", "version", _data
    FROM private.get_msg_template(_template) AS t("template", "version")
  RETURNING "id" INTO STRICT _id;

  NOTIFY MSG_SMS, 'NEW';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
