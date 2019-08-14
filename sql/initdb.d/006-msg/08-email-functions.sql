CREATE OR REPLACE FUNCTION private.msg_email(
  _template public.msg_template_id,
  _email varchar(256),
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO private.msg_email("to", "toName", "template", "version", "data")
    SELECT _email, coalesce(_data->>'name', ''), "template", "version", _data
    FROM private.get_msg_template(_template) AS t("template", "version")
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_new, 'email';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;
