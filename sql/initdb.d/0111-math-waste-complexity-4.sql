SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_4_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 9 + 1);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого содержат цифру ', X)
      )
    FROM (
      SELECT
        d[1] * 1000 + d[2] * 100 + d[3] * 10 + d[4] AS "data",
        TRUE AS "correct"
      FROM (
        SELECT (array_agg(s ORDER BY random()))[1:4] AS d
        FROM generate_series(1, 9) AS s
        WHERE s <> X
      ) AS t

      UNION ALL

      SELECT
        "data" AS "data",
        FALSE AS "correct"
      FROM (
        SELECT
          (SELECT "data"
            FROM unnest(ARRAY[
              X * 1000 + a * 100 + b * 10 + c,
              a * 1000 + X * 100 + b * 10 + c,
              a * 1000 + b * 100 + X * 10 + c,
              a * 1000 + b * 100 + c * 10 + X
            ]) "data"
            ORDER BY random()
            LIMIT 1
          ) AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(1, 9) AS b ON TRUE
        INNER JOIN generate_series(1, 9) AS c ON TRUE
        WHERE a <> X AND b <> X AND c <> X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_4_1(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABСD → A + B = СD')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(1111, 9999) AS s
        WHERE (s / 1000) + (s % 1000 / 100) <> (s % 100)
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + a + b AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(1, 9) AS b ON TRUE
        WHERE a + b >= 10
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_4_2(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABСD → A * B = СD')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(1111, 9999) AS s
        WHERE (s / 1000) * (s % 1000 / 100) <> (s % 100)
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + a * b AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(1, 9) AS b ON TRUE
        WHERE a * b >= 10
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_4(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*2)::int
    WHEN 0 THEN
      RETURN private.trainer__math_waste__complexity_4_0(_length);
    WHEN 1 THEN
      RETURN private.trainer__math_waste__complexity_4_1(_length);
    WHEN 2 THEN
      RETURN private.trainer__math_waste__complexity_4_2(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
