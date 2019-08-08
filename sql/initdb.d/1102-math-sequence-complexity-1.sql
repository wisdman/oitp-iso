SET search_path = "$user";

-- +/- X
CREATE OR REPLACE FUNCTION trainer.math_sequence_complexity_1_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 20 - 10);
  A int := (CASE WHEN X < 0 THEN floor(random() * 20 + 80) ELSE floor(random() * 9 + 1) END);
BEGIN
  RETURN (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'rune', chr(i+64),
          'data', A + X * i,
          'act', concat(chr(i+63),TO_CHAR(X, 'FMPL9'))
        )
      )
    FROM generate_series(1, _length) AS "i"
  );
END $$ LANGUAGE plpgsql VOLATILE;

-- +/- X  +/- Y
CREATE OR REPLACE FUNCTION trainer.math_sequence_complexity_1_1(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 20 - 10);
  Y int := floor(random() * 20 - 10);
  A int := (CASE WHEN X+Y < 0 THEN floor(random() * 20 + 80) ELSE floor(random() * 9 + 1) END);
BEGIN
  RETURN (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'rune', chr(i+64),
          'data', "data",
          'act', concat(chr(i+63),TO_CHAR("inc", 'FMPL99'))
        )
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER ())::int AS "i",
        "inc",
        sum("inc") OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "data"
      FROM (
        SELECT A AS "inc"
        UNION ALL
        SELECT unnest(ARRAY[X,Y]) AS "inc" FROM generate_series(1, _length)
        LIMIT _length
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION trainer.math_sequence_complexity_1(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*1)::int
    WHEN 0 THEN
      RETURN trainer.math_sequence_complexity_1_0(_length);
    WHEN 1 THEN
      RETURN trainer.math_sequence_complexity_1_1(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
