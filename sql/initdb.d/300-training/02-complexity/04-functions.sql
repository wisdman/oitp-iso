CREATE OR REPLACE FUNCTION private.get_complexity(_trainer public.trainer_type, _owner uuid)
RETURNS table (
  "complexity" smallint,
  "previewTimeLimit" int,
  "playTimeLimit" int
) AS $$
BEGIN
  RETURN QUERY
    SELECT
      coalesce(c."complexity", d."complexity") AS "complexity",
      coalesce(c."previewTimeLimit", d."previewTimeLimit") AS "previewTimeLimit",
      coalesce(c."playTimeLimit", d."playTimeLimit") AS "playTimeLimit"
    FROM private.complexity_defaults AS d
    LEFT JOIN private.users_complexity AS c ON (c."trainer" = d."trainer" AND c."owner" = _owner)
    WHERE d."trainer" = _trainer
    ORDER BY c."ts" DESC
    LIMIT 1;
END; $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.set_complexity(
  _trainer varchar(32),
  _owner uuid,
  _complexity smallint,
  _previewTimeLimit int,
  _playTimeLimit int
) RETURNS table (
  "complexity" smallint,
  "previewTimeLimit" int,
  "playTimeLimit" int
) AS $$
BEGIN
  RETURN QUERY
    INSERT INTO private.users_complexity("trainer", "owner", "complexity", "previewTimeLimit", "playTimeLimit")
      SELECT
        _trainer, _owner,
        coalesce(_complexity, "complexity"),
        coalesce(_previewTimeLimit, "previewTimeLimit"),
        coalesce(_playTimeLimit, "playTimeLimit")
      FROM private.get_complexity(_trainer, _owner)
    RETURNING "complexity", "previewTimeLimit", "playTimeLimit";
END; $$ LANGUAGE plpgsql VOLATILE;
