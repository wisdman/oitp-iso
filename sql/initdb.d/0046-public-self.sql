SET search_path = "$user";

CREATE VIEW self.user AS
  SELECT
    u."profile" || jsonb_build_object(
      'id', u."id",

      'email', u."email",
      'emailIsValid', u."emailIsValid",

      'phone', u."phone",
      'phoneIsValid', u."phoneIsValid",

      'name', u."name",
      'surname', u."surname",
      'avatar', u."avatar",

      'tariff', u."tariff"
    ) AS "user"
  FROM private.users AS u
  WHERE
    u."deleted" IS NULL
    AND
    u."enabled"
    AND
    u."id" = current_setting('app.sessionUser')::uuid;

GRANT SELECT ON self.user TO "api-public";

CREATE OR REPLACE FUNCTION self.user__update(_user jsonb) RETURNS void AS $$
BEGIN
  UPDATE private.users AS u
  SET
    "name" = COALESCE(_user->>'name', u."name"),
    "surname" = COALESCE(_user->>'surname', u."name"),
    "profile" = u."profile" || (_user - 'name' - 'surname')
  WHERE
    u."deleted" IS NULL
    AND
    u."enabled"
    AND
    u."id" = current_setting('app.sessionUser')::uuid;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Incorrect user';
  END IF;
END; $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
