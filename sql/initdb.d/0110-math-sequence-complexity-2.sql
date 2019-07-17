SET search_path = "$user";

-- A = +/- X; B = +/- Y
CREATE OR REPLACE FUNCTION private.trainer__math_sequence__complexity_2_0(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 20 - 10);
  Y int := floor(random() * 20 - 10);
  A int := (CASE WHEN X < 0 THEN floor(random() * 20 + 80) ELSE floor(random() * 9 + 1) END);
  B int := (CASE WHEN Y < 0 THEN floor(random() * 20 + 80) ELSE floor(random() * 9 + 1) END);
BEGIN
  RETURN (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'rune', chr(i+64),
          'data', "data",
          'act', concat(chr(i+62),TO_CHAR("inc", 'FMPL99'))
        )
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER ())::int AS "i",
        ("O"->'item')::int AS "inc",
        "O"->'sum' AS "data"
      FROM (
        SELECT
          unnest(ARRAY[
            jsonb_build_object('item', "A", 'sum', sum("A") OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)),
            jsonb_build_object('item', "B", 'sum', sum("B") OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW))
          ]) AS "O"
        FROM (
          SELECT A AS "A", B AS "B"
          UNION ALL
          SELECT X AS "A", Y AS "B" FROM generate_series(1, 5)
          LIMIT _length
        ) AS t
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;

-- A = +/- X; B = random
CREATE OR REPLACE FUNCTION private.trainer__math_sequence__complexity_2_1(_length int) RETURNS jsonb AS $$
DECLARE
  X int := floor(random() * 20 - 10);
  A int := (CASE WHEN X < 0 THEN floor(random() * 20 + 80) ELSE floor(random() * 9 + 1) END);
BEGIN
  RETURN (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'rune', chr(i+64),
          'data', "data",
          'act', concat(chr(i+62),TO_CHAR("inc", 'FMPL99'))
        )
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER ())::int AS "i",
        ("O"->'item')::int AS "inc",
        "O"->'sum' AS "data"
      FROM (
        SELECT
          unnest(ARRAY[
            jsonb_build_object('item', "A", 'sum', sum("A") OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)),
            jsonb_build_object('item', "B", 'sum', sum("B") OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW))
          ]) AS "O"
        FROM (
          SELECT A AS "A", floor(random() * 9 + 1) AS "B"
          UNION ALL
          SELECT X AS "A", floor(random() * 9 + 1) AS "B" FROM generate_series(1, 5)
          LIMIT _length
        ) AS t
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION private.trainer__math_sequence__complexity_2(_length int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*1)::int
    WHEN 0 THEN
      RETURN private.trainer__math_sequence__complexity_2_0(_length);
    WHEN 1 THEN
      RETURN private.trainer__math_sequence__complexity_2_1(_length);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;


