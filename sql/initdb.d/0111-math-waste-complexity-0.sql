SET search_path = "$user";

-- common factor
CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_0_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 9 + 1);
  min int := ceil(10.0/X);
  max int := floor(99.0/X);
BEGIN
  RETURN (
    SELECT
      jsonb_agg("item")
    FROM (
      SELECT *
      FROM (
        SELECT
          jsonb_build_object(
            'data',  floor(random() * (max - min + 1) + min) * X - 1,
            'correct', TRUE
          ) AS "item"
        UNION ALL
        SELECT
          jsonb_build_object(
            'data', floor(random() * (max - min + 1) + min) * X,
            'correct', FALSE
          ) AS "item"
        FROM generate_series(1, _length)
        LIMIT _length
      ) AS t
      ORDER BY random()
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

-- common number
CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_0_1(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 9 + 1);
BEGIN
  RETURN (
    SELECT
      jsonb_agg("item")
    FROM (
      SELECT *
      FROM (
        SELECT
          jsonb_build_object(
            'data',  "data"[1] * 100 + "data"[2] * 10 + "data"[3],
            'correct', TRUE
          ) AS "item"
        FROM (
          SELECT array_agg(s) AS "data"
          FROM (
            SELECT s FROM generate_series(1, 9) AS s
            WHERE s <> X
            ORDER BY random()
            LIMIT 3
          ) AS t
        ) AS t
        UNION ALL
        SELECT
          jsonb_build_object(
            'data', "data"[1] * 100 + "data"[2] * 10 + "data"[3],
            'correct', FALSE
          ) AS "item"
        FROM (
          SELECT (
            SELECT array_agg(v ORDER BY random()) FROM unnest("V") AS v
          ) AS "data"
          FROM (
            SELECT ARRAY[X, floor(random() * 9 + 1), floor(random() * 9 + 1)] AS "V"
            FROM generate_series(1, _length)
          ) AS t
        ) AS t
        LIMIT _length
      ) AS t
      ORDER BY random()
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_0(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*1)::int
    WHEN 0 THEN
      RETURN private.trainer__math_waste__complexity_0_0(_length);
    WHEN 1 THEN
      RETURN private.trainer__math_waste__complexity_0_1(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
