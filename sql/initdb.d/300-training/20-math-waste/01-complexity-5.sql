CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_5_0(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABСD → A + B = С + D')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(1111, 9999) AS s
        WHERE (s / 1000) + (s % 1000 / 100) <> (s % 100 / 10) + (s % 10)
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + c * 10 + d AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        INNER JOIN generate_series(0, 9) AS c ON TRUE
        INNER JOIN generate_series(0, 9) AS d ON TRUE
        WHERE a + b = c + d
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_5_1(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABСD → A - B = С - D')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(1111, 9999) AS s
        WHERE (s / 1000) - (s % 1000 / 100) <> (s % 100 / 10) - (s % 10)
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + c * 10 + d AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        INNER JOIN generate_series(0, 9) AS c ON TRUE
        INNER JOIN generate_series(0, 9) AS d ON TRUE
        WHERE a - b = c - d
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_5_2(_length int) RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT
      jsonb_build_object(
        'items', jsonb_agg(to_jsonb(t) ORDER BY random()),
        'answer', concat('ABСD → A * B = С * D')
      )
    FROM (
      SELECT
        "data",
        TRUE AS "correct"
      FROM (
        SELECT s AS "data"
        FROM generate_series(1111, 9999) AS s
        WHERE (s / 1000) * (s % 1000 / 100) <> (s % 100 / 10) * (s % 10)
        ORDER BY random()
        LIMIT 1
      ) AS t

      UNION ALL

      SELECT
        "data",
        FALSE AS "correct"
      FROM (
        SELECT a * 1000 + b * 100 + c * 10 + d AS "data"
        FROM generate_series(1, 9) AS a
        INNER JOIN generate_series(0, 9) AS b ON TRUE
        INNER JOIN generate_series(0, 9) AS c ON TRUE
        INNER JOIN generate_series(0, 9) AS d ON TRUE
        WHERE a * b = c * d
        ORDER BY random()
        LIMIT _length - 1
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_waste_complexity_5(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*2)::int
    WHEN 0 THEN
      RETURN trainer.math_waste_complexity_5_0(_length);
    WHEN 1 THEN
      RETURN trainer.math_waste_complexity_5_1(_length);
    WHEN 2 THEN
      RETURN trainer.math_waste_complexity_5_2(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
