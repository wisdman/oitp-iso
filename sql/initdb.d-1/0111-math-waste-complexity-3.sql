SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_3_0(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Во всех числах кроме искомого первая и последняя цифры одинаковы')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT a * 100 + b * 10 + c AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        INNER JOIN generate_series(0, 9) AS c ON c <> a
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 100 + b * 10 + a AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_3_1(_length int) RETURNS jsonb AS $$
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
          (SELECT "data"
            FROM unnest(ARRAY[
              X * 100 + a * 10 + b,
              a * 100 + X * 10 + b,
              a * 100 + b * 10 + X
            ]) "data"
            ORDER BY random()
            LIMIT 1
          ) AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON a <> b
        WHERE a <> X AND b <> X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

-- Выкинуть чет нечет
CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_3_2(_length int) RETURNS jsonb AS $$
DECLARE
   -- 1 - 26
  X int := floor(random() * 26 + 1);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABC → A + B + C = ', X)
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(111, 999) AS s
        WHERE (s / 100) + (s % 100 / 10) + (s % 10) <> X
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 100 + b * 10 + c AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        INNER JOIN generate_series(0, 9) AS c ON TRUE
        WHERE a + b + c = X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_3_3(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого зеркальны')
      )
    FROM (
      SELECT
        d[1] * 1000 + d[2] * 100 + d[3] * 10 + d[1] AS "data",
        TRUE AS "correct"
      FROM (
        SELECT (array_agg(s ORDER BY random()))[1:3] AS d
        FROM generate_series(1, 9) AS s
      ) AS t

      UNION ALL

      SELECT
        "data" AS "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + b * 10 + a AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(1, 9) AS b ON TRUE
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_waste__complexity_3(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*3)::int
    WHEN 0 THEN
      RETURN private.trainer__math_waste__complexity_3_0(_length);
    WHEN 1 THEN
      RETURN private.trainer__math_waste__complexity_3_1(_length);
    WHEN 2 THEN
      RETURN private.trainer__math_waste__complexity_3_2(_length);
    WHEN 3 THEN
      RETURN private.trainer__math_waste__complexity_3_3(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;

