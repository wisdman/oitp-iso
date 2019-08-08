SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_1_0(_length int) RETURNS jsonb AS $$
DECLARE
  _type int := floor(random() * 2);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого ', (CASE WHEN _type = 0 THEN 'четные' ELSE 'нечетные' END))
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
          SELECT s AS "data"
          FROM generate_series(11, 99) AS s
          WHERE s % 2 = _type
          ORDER BY random()
          LIMIT _length
        ) AS t
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_1_1(_length int) RETURNS jsonb AS $$
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
        d[1] * 10 + d[2] AS "data",
        TRUE AS "correct"
      FROM (
        SELECT (array_agg(s ORDER BY random()))[1:2] AS d
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
              X * 10 + a,
              a * 10 + X
            ]) "data"
            ORDER BY random()
            LIMIT 1
          ) AS "data"
        FROM generate_series(1, 9) AS a
        WHERE a <> X
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_1_2(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('Все числа кроме искомого состоят из одинаковых цифр')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT a * 10 + b AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON a <> b
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 10 + a AS "data"
        FROM generate_series(1, 9) AS a
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_1(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*2)::int
    WHEN 0 THEN
      RETURN trainer.math_waste_complexity_1_0(_length);
    WHEN 1 THEN
      RETURN trainer.math_waste_complexity_1_1(_length);
    WHEN 2 THEN
      RETURN trainer.math_waste_complexity_1_2(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
