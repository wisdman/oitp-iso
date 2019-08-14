-- AB ( A ? B ? X ? Y ) XY
CREATE OR REPLACE FUNCTION trainer.math_middle_complexity_6_0(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; X int; Y int; L int; R int; SUM int;
  OP char[] := (SELECT array_agg(v ORDER BY random()) FROM unnest(ARRAY['+','-','*']) v);
  FORMULA text;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    X := floor(random() * 9 + 1);
    Y := floor(random() * 9 + 1);
    L := A*10 + B;
    R := X*10 + Y;
    FORMULA := concat(A,OP[1],B,OP[2],X,OP[3],Y);
    EXECUTE format('SELECT ABS(%s)', FORMULA) INTO SUM;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat('|',FORMULA,'| = ',SUM)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION trainer.math_middle_complexity_6(_quantity int) RETURNS jsonb AS $$
BEGIN
  RETURN trainer.math_middle_complexity_6_0(_quantity);
END $$ LANGUAGE plpgsql VOLATILE;
