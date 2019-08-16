CREATE OR REPLACE FUNCTION self.training_progress(OUT _result jsonb) AS $$
BEGIN
  SELECT jsonb_agg("item") INTO STRICT _result
  FROM (
    SELECT
      jsonb_build_object(
        'id', "id",
        'values', (array_agg("value" ORDER BY "finish"))[1:10],
        'average', ROUND(AVG("value"))
      ) AS "item"
    FROM (
      SELECT
        "finish",
        "result"->>'id' AS "id",
        ("result"->'result')::smallint AS "value"
      FROM (
        SELECT "finish", jsonb_array_elements("progress"->'results') AS "result"
        FROM private.users_trainings
        WHERE "finish" IS NOT NULL
          AND "type" = 'everyday'
          AND "owner" = current_setting('app.sessionUser')::uuid
      ) AS _
      WHERE "result"->>'result' IS NOT NULL
    ) AS _
    GROUP BY "finish", "id"
  ) AS _;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
