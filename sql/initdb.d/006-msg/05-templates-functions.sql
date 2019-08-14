CREATE OR REPLACE FUNCTION private.get_msg_template(INOUT _id public.msg_template_id, OUT _version smallint) AS $$
BEGIN
  SELECT "id", "version" INTO STRICT _id, _version
  FROM private.msg_templates
  WHERE "id" = _id AND "enabled"
  ORDER BY "version" DESC LIMIT 1;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;
