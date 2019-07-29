SET search_path = "$user";

CREATE VIEW self.progress AS
  SELECT
    jsonb_build_object(
      'id', "group",
      'values', (array_agg(ROUND("progress") ORDER BY "finish" DESC))[1:7],
      'average', ROUND(AVG("progress"))
    ) AS "progress"
  FROM (
    SELECT
      t."finish" AS "finish",
      g."group" AS "group",
      AVG((r."result"->'result')::smallint) AS "progress"
    FROM private.training_trainers r
    LEFT JOIN private.training t ON (t."id" = r."training")
    LEFT JOIN public.trainer_to_group g ON (g."trainer" = r."id")
    WHERE
      t."owner" = current_setting('app.sessionUser')::uuid
      AND
      t."deleted" IS NULL
      AND
      t.finish IS NOT NULL
      AND
      t."type" = 'everyday'
      AND
      r."result"->>'result' IS NOT NULL
    GROUP BY "finish", "group"
  ) AS t
  GROUP BY "group";

GRANT SELECT ON self.progress TO "api-public";

CREATE VIEW self.progress__speed AS
  SELECT
    jsonb_build_object(
      'id', 'speed',
      'values', (array_agg(ROUND("speed") ORDER BY "finish" DESC))[1:10],
      'average', ROUND(AVG("speed"))
    ) AS "progress"
  FROM (
    SELECT
      t."finish" AS "finish",
      AVG(GREATEST(1 - ((r."result"->'playTime')::float / 1000) / (r."config"->'playTimeLimit')::float, 0) * (r."result"->'result')::float) AS "speed"
    FROM private.training_trainers AS r
    LEFT JOIN private.training t ON (t."id" = r."training")
    LEFT JOIN public.trainer_to_group g ON (g."trainer" = r."id")
    WHERE
      t."owner" = current_setting('app.sessionUser')::uuid
      AND
      t."deleted" IS NULL
      AND
      t.finish IS NOT NULL
      AND
      t."type" = 'everyday'
      AND
      r."result"->>'result' IS NOT NULL
      AND
      (r."result"->'playTime')::int <> 0
      AND
      (r."config"->'playTimeLimit')::int <> 0
    GROUP BY "finish"
  ) AS t;

GRANT SELECT ON self.progress__speed TO "api-public";


CREATE VIEW self.progress__charge AS
  SELECT
    jsonb_build_object(
      'id', 'charge',
      'values', null,
      'average', 93
    ) AS "progress";

GRANT SELECT ON self.progress__charge TO "api-public";
