SET search_path = "$user";

CREATE VIEW self.progress AS
  SELECT
    jsonb_build_object(
      'id', "group",
      'values', (array_agg(ROUND("progress") ORDER BY "start" DESC))[1:7],
      'average', ROUND(AVG("progress"))
    ) AS "progress"
  FROM (
    SELECT
      t."start" AS "start",
      g."group" AS "group",
      AVG((r."result"->'result')::smallint) AS "progress"
    FROM private.training_trainers r
    LEFT JOIN private.training t ON (t."id" = r."training")
    LEFT JOIN public.trainer_to_group g ON (g."trainer" = r."id")
    WHERE
      t."deleted" IS NULL
      AND
      t."owner" = current_setting('app.sessionUser')::uuid
      AND
      r."result" IS NOT NULL
      AND
      r."result"->>'result' IS NOT NULL
    GROUP BY "start", "group"
  ) AS t
  GROUP BY "group";

GRANT SELECT ON self.progress TO "api-public";
