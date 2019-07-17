SET search_path = "$user";

-- AB ( AB XY ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_2_0(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; X int; Y int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    X := floor(random() * 9 + 1);
    Y := floor(random() * 9 + 1);
    L := A*10 + B;
    R := X*10 + Y;
    SUM := A*1000 + B*100 + X*10 + Y;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(L,' ( ',L,'|',R,' ) ',R)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- AB ( XY AB ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_2_1(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; X int; Y int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    X := floor(random() * 9 + 1);
    Y := floor(random() * 9 + 1);
    L := A*10 + B;
    R := X*10 + Y;
    SUM := X*1000 + Y*100 + A*10 + B;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(R,' ( ',R,'|',L,' ) ',L)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- AB ( A+B X+Y ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_2_2(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; AB int; X int; Y int; XY int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 8 + 1);
    B := floor(random() * A + 10) - A;
    X := floor(random() * 8 + 1);
    Y := floor(random() * X + 10) - X;
    AB := A + B;
    XY := X + Y;
    L := A*10 + B;
    R := X*10 + Y;
    SUM := AB*100 + XY;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(A,' + ',B,' = ',AB,'|',XY,' = ',X,' + ',Y)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- AB ( X+Y A+B ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_2_3(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; AB int; X int; Y int; XY int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 8 + 1);
    B := floor(random() * A + 10) - A;
    X := floor(random() * 8 + 1);
    Y := floor(random() * X + 10) - X;
    AB := A + B;
    XY := X + Y;
    L := A*10 + B;
    R := X*10 + Y;
    SUM := XY*100 + AB;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(X,' + ',Y,' = ',XY,'|',AB,' = ',A,' + ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_2(_quantity int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*3)::int
    WHEN 0 THEN
      RETURN private.trainer__math_middle__complexity_2_0(_quantity);
    WHEN 1 THEN
      RETURN private.trainer__math_middle__complexity_2_1(_quantity);
    WHEN 2 THEN
      RETURN private.trainer__math_middle__complexity_2_2(_quantity);
    WHEN 3 THEN
      RETURN private.trainer__math_middle__complexity_2_3(_quantity);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
