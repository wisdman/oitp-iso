SET search_path = "$user";

-- AB ( random(A,B,X,Y) ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_4_0(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; X int; Y int; L int; R int; SUM int; VAL int[];
  POS int[] := (SELECT array_agg(v ORDER BY random()) FROM unnest(ARRAY[1,2,3,4]) v);
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    SELECT array_agg(v) INTO VAL FROM (SELECT v FROM generate_series(1,9) AS v ORDER BY random() LIMIT 4) AS v;
    A := VAL[1];
    B := VAL[2];
    X := VAL[3];
    Y := VAL[4];
    L := A*10 + B;
    R := X*10 + Y;
    VAL := ARRAY[ VAL[POS[1]], VAL[POS[2]], VAL[POS[3]], VAL[POS[4]] ];
    SUM := VAL[1]*1000 + VAL[2]*100 + VAL[3]*10 + VAL[4];
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(A,' ',B,' ( ',array_to_string(VAL,','),' ) ',X,' ',Y)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- ABC ( A+B-C X+Y-Z ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_4_1(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 8 + 1);
    B := floor(random() * A + 10) - A;
    C := floor(random() * 9 + 1);
    X := floor(random() * 8 + 1);
    Y := floor(random() * X + 10) - X;
    Z := floor(random() * 9 + 1);
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := A + B - C;
    XYZ := X + Y - Z;
    SUM := ABC*10 + XYZ;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(A,' + ',B,' - ',C,' = ',ABC,'|',XYZ,' = ',X,' + ',Y,' - ',Z)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- ABC ( X+Y-Z A+B-C ) XYZ
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_4_2(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; C int; ABC int; X int; Y int; Z int; XYZ int; L int; R int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 8 + 1);
    B := floor(random() * A + 10) - A;
    C := floor(random() * 9 + 1);
    X := floor(random() * 8 + 1);
    Y := floor(random() * X + 10) - X;
    Z := floor(random() * 9 + 1);
    L := A*100 + B*10 + C;
    R := X*100 + Y*10 + Z;
    ABC := A + B - C;
    XYZ := X + Y - Z;
    SUM := XYZ*10 + ABC;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(X,' + ',Y,' - ',Z,' = ',XYZ,'|',ABC,' = ',A,' + ',B,' - ',C)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_4(_quantity int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*2)::int
    WHEN 0 THEN
      RETURN private.trainer__math_middle__complexity_4_0(_quantity);
    WHEN 1 THEN
      RETURN private.trainer__math_middle__complexity_4_1(_quantity);
    WHEN 2 THEN
      RETURN private.trainer__math_middle__complexity_4_2(_quantity);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
