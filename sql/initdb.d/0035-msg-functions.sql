SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.get_msg_template(INOUT _id public.msg_template_id, OUT _version smallint) AS $$
BEGIN
  SELECT "id", "version" INTO STRICT _id, _version
  FROM private.msg_templates
  WHERE "id" = _id AND "enabled"
  ORDER BY "version" DESC LIMIT 1;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;

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

CREATE OR REPLACE FUNCTION private.msg_sms(
  _template public.msg_template_id,
  _phone varchar(15),
  _data jsonb
) RETURNS uuid AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO private.msg_sms("to", "template", "version", "data")
    SELECT _phone, "template", "version", _data
    FROM private.get_msg_template(_template) AS t("template", "version")
  RETURNING "id" INTO STRICT _id;

  NOTIFY msg_new, 'sms';
  RETURN _id;
END; $$ LANGUAGE plpgsql VOLATILE;

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
