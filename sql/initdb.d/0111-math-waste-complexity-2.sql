SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_2_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 7 + 3);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого делятся на ', X)
      )
    FROM (
      SELECT
        "data" - "correct"::int AS "data",
        "correct"
      FROM (
        SELECT
          "data" AS "data",
          (ROW_NUMBER() OVER ()) = 1 AS "correct"
        FROM (
          SELECT s * X AS "data"
          FROM generate_series(10/X + 1, 99/X) AS s
          ORDER BY random()
          LIMIT _length
        ) AS t
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_2_1(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 9 + 1);
  _type int := floor(random() * 3);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого содержат цифру ', X)
      )
    FROM (
      SELECT
        d[1] * 100 + d[2] * 10 + d[3] AS "data",
        TRUE AS "correct"
      FROM (
        SELECT (array_agg(s ORDER BY random()))[1:3] AS d
        FROM generate_series(1, 9) AS s
        WHERE s <> X
      ) AS t

      UNION ALL

      SELECT
        "data" AS "data",
        FALSE AS "correct"
      FROM (
        SELECT
          CASE _type
            WHEN 0 THEN X * 100 + a * 10 + b
            WHEN 1 THEN a * 100 + X * 10 + b
            WHEN 2 THEN a * 100 + b * 10 + X
          END AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(1, 9) AS b ON a <> b
        WHERE a <> X AND b <> X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_2_2(_length int) RETURNS jsonb AS $$
DECLARE
   -- 3 - 16
  X int := floor(random() * 14 + 3);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('AB → A + B = ', X)
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(10, 99) AS s
        WHERE (s / 10) + (s % 10) <> X
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 10 + b AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        WHERE a + b = X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_2_3(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    WITH d AS (
      SELECT
        array_agg(a * 10 + b) AS "data",
        a * b AS "sum"
      FROM generate_series(1, 9) AS a
      INNER JOIN generate_series(1, 9) AS b ON a <> b
      GROUP BY "sum"
      ORDER BY random()
      LIMIT 1
    )
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('AB → A * B = ', (SELECT "sum" FROM d))
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(10, 99) AS s
        INNER JOIN d AS d ON (s / 10) * (s % 10) <> d."sum"
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT unnest("data") AS "data"
        FROM d
        ORDER BY random()
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_2(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*3)::int
    WHEN 0 THEN
      RETURN private.trainer__math_waste__complexity_2_0(_length);
    WHEN 1 THEN
      RETURN private.trainer__math_waste__complexity_2_1(_length);
    WHEN 2 THEN
      RETURN private.trainer__math_waste__complexity_2_2(_length);
    WHEN 3 THEN
      RETURN private.trainer__math_waste__complexity_2_3(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
