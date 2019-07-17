SET search_path = "$user";
-- ABC ( AB-C XY-Z  ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_5_0(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    C := floor(random() * 9 + 1);
    X := floor(random() * 9 + 1);
    Y := floor(random() * 9 + 1);
    Z := floor(random() * 9 + 1);
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := A*10 + B - C;
    XYZ := X*10 + Y - Z;
    SUM := ABC*100 + XYZ;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(A,B,' - ',C,' = ',ABC,'|',XYZ,' = ',X,Y,' - ',Z)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- ABC ( XY-Z AB-C ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_5_1(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    C := floor(random() * 9 + 1);
    X := floor(random() * 9 + 1);
    Y := floor(random() * 9 + 1);
    Z := floor(random() * 9 + 1);
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := A*10 + B - C;
    XYZ := X*10 + Y - Z;
    SUM := XYZ*100 + ABC;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(X,Y,' - ',Z,' = ',XYZ,'|',ABC,' = ',A,B,' - ',C)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- ABC ( (A+B)*C (X+Y)*Z ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_5_2(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * A + 10) - A;
    C := floor(random() * 80/(A+B)) + 1;
    X := floor(random() * 8 + 1);
    Y := floor(random() * 9 + 1);
    Z := floor(random() * 80/(X+Y)) + 1;
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := (A + B) * C;
    XYZ := (X + Y) * Z;
    SUM := ABC*100 + XYZ;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat('(',A,' + ',B,') * ',C,' = ',ABC,'|',XYZ,' = (',X,' + ',Y,') * ',Z)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- ABC ( (X+Y)*Z (A+B)*C ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_5_3(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * A + 10) - A;
    C := floor(random() * 80/(A+B)) + 1;
    X := floor(random() * 8 + 1);
    Y := floor(random() * 9 + 1);
    Z := floor(random() * 80/(X+Y)) + 1;
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := (A + B) * C;
    XYZ := (X + Y) * Z;
    SUM := XYZ*100 + ABC;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat('(',X,' + ',Y,') * ',Z,' = ',XYZ,'|',ABC,' = (',A,' + ',B,') * ',C)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_5(_quantity int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*3)::int
    WHEN 0 THEN
      RETURN private.trainer__math_middle__complexity_5_0(_quantity);
    WHEN 1 THEN
      RETURN private.trainer__math_middle__complexity_5_1(_quantity);
    WHEN 2 THEN
      RETURN private.trainer__math_middle__complexity_5_2(_quantity);
    WHEN 3 THEN
      RETURN private.trainer__math_middle__complexity_5_3(_quantity);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
