CREATE OR REPLACE FUNCTION private.msg_push(
  _template public.msg_template_id,
  _recipient uuid,
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO private.msg_sms("to", "template", "version", "data")
    SELECT _recipient, "template", "version", _data
    FROM private.get_msg_template(_template) AS t("template", "version")
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_new, 'push';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
