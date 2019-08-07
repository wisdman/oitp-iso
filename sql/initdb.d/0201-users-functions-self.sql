SET search_path = "$user";

CREATE OR REPLACE FUNCTION self.get_user(OUT _user jsonb) AS $$
BEGIN
  SELECT
    u."profile" || jsonb_build_object(
      'id', u."id",

      'email', u."email",
      'phone', u."phone",

      'validity', u."validity",
      'tariff', private.get_user_tariff(u."id")
    ) INTO STRICT _user
  FROM private.users AS u
  WHERE u."deleted" IS NULL
    AND u."enabled"
    AND u."id" = current_setting('app.sessionUser')::uuid;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.update_user(_user jsonb) RETURNS jsonb AS $$
BEGIN
  UPDATE private.users AS u
  SET "profile" = u."profile" || _user - 'id'
  WHERE u."id" = (_user->>'id')::uuid
    AND u."id" = current_setting('app.sessionUser')::uuid
    AND u."deleted" IS NULL
    AND u."enabled";

  IF NOT FOUND THEN
    RAISE EXCEPTION undefined_object USING MESSAGE = 'Incorrect user';
  END IF;

  RETURN self.user();
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION self.update_user_password(_old text, _new text) RETURNS void AS $$
BEGIN
  UPDATE private.users AS u
  SET "password" = digest(_new, 'sha512')
  WHERE u."id" = current_setting('app.sessionUser')::uuid
    AND u."password" = digest(_old, 'sha512')
    AND u."deleted" IS NULL
    AND u."enabled";
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
