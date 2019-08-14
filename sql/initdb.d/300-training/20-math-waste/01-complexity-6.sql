CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_6_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 18); -- 0 - 17
  _type int := floor(random() * 2);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat(CASE _type
                          WHEN 0 THEN 'ABC → A + B - C = '
                          WHEN 1 THEN 'ABC → A - B + C = '
                        END, X)
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(111, 999) AS s
        WHERE CASE _type
          WHEN 0 THEN (s / 100) + (s % 100 / 10) - (s % 10) <> X
          WHEN 1 THEN (s / 100) - (s % 100 / 10) + (s % 10) <> X
        END
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
        WHERE CASE _type
          WHEN 0 THEN a + b - c = X
          WHEN 1 THEN a - b + c = X
        END
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_6_1(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 82); -- 0 - 81
  _type int := floor(random() * 2);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat(CASE _type
                          WHEN 0 THEN 'ABC → A * B + C = '
                          WHEN 1 THEN 'ABC → A + B * C = '
                        END, X)
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(111, 999) AS s
        WHERE CASE _type
          WHEN 0 THEN (s / 100) * (s % 100 / 10) + (s % 10) <> X
          WHEN 1 THEN (s / 100) + (s % 100 / 10) * (s % 10) <> X
        END
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
        WHERE CASE _type
          WHEN 0 THEN a * b + c = X
          WHEN 1 THEN a + b * c = X
        END
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_6_2(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 73); -- 0 - 72
  _type int := floor(random() * 2);
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat(CASE _type
                          WHEN 0 THEN 'ABC → A * B - C = '
                          WHEN 1 THEN 'ABC → A - B * C = '
                        END, X)
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(111, 999) AS s
        WHERE CASE _type
          WHEN 0 THEN (s / 100) * (s % 100 / 10) - (s % 10) <> X
          WHEN 1 THEN (s / 100) - (s % 100 / 10) * (s % 10) <> X
        END
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
        WHERE CASE _type
          WHEN 0 THEN a * b - c = X
          WHEN 1 THEN a - b * c = X
        END
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_6(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*2)::int
    WHEN 0 THEN
      RETURN trainer.math_waste_complexity_6_0(_length);
    WHEN 1 THEN
      RETURN trainer.math_waste_complexity_6_1(_length);
    WHEN 2 THEN
      RETURN trainer.math_waste_complexity_6_2(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
