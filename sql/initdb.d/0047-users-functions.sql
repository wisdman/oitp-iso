SET search_path = "$user";

CREATE OR REPLACE FUNCTION public.users__init_session(_sessionKey char(128), _ip inet)
RETURNS bool
AS $$
  DECLARE
    _sessionUser text;
  BEGIN
    UPDATE private.sessions AS s
    SET "ip" = _ip
    FROM public.users AS u
    WHERE
      u."id" = s."owner"
      AND
      s."id" = _sessionKey
      AND
      s."expires" > timezone('UTC', now())
      AND
      s."logout" IS NULL
    RETURNING u."id" INTO _sessionUser;

    IF NOT FOUND THEN
      RETURN FALSE;
    END IF;

    PERFORM set_config('app.sessionKey', _sessionKey, true);
    PERFORM set_config('app.sessionUser', _sessionUser, true);
    RETURN TRUE;
  END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.users__email_login(_email text, _password text, _ip inet, _fingerprint jsonb)
RETURNS table (
  "id" char(128),
  "expires" text
)
AS $$
  BEGIN
    RETURN QUERY
      INSERT INTO private.sessions AS s ("owner", "ip", "fingerprint")
        SELECT
          u."id" AS "owner",
          _ip AS "ip",
          _fingerprint AS "fingerprint"
        FROM
          public.users AS u
        WHERE
          u."email" = _email
          AND
          u."password" = digest(_password, 'sha512')
      RETURNING
        s."id",
        to_char(s."expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "expires";
  END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.users__logout()
RETURNS void
AS $$
  BEGIN
    UPDATE
      private.sessions AS s
    SET
      "logout" = timezone('UTC', now())
    WHERE
      s."id" = current_setting('app.sessionKey')::char(128);
  END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
