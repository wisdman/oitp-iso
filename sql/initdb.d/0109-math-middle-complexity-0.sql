SET search_path = "$user";

-- A ( AB ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_0(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    SUM := A*10 + B;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(A,' ( ',A,'|',B,' ) ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- A ( BA ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_1(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    SUM := B*10 + A;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(A,' ( ',B,'|',A,' ) ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- A ( A+B ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_2(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    SUM := A+B;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(SUM,' = ',A,' + ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- A ( A*B ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_3(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 9 + 1);
    B := floor(random() * 9 + 1);
    SUM := A*B;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(SUM,' = ',A,' * ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- A ( A-B ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_4(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 99 + 1);
    B := floor(random() * 99 + 1);
    IF B > A THEN
      SELECT A, B INTO B, A;
    END IF;
    SUM := A - B;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(SUM,' = ',A,' - ',B)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- A ( B-A ) B
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_5(_quantity int) RETURNS jsonb AS $$
DECLARE
  A int; B int; SUM int;
  RES jsonb := '[]'::jsonb;
BEGIN
  FOR counter in 1.._quantity LOOP
    A := floor(random() * 99 + 1);
    B := floor(random() * 99 + 1);
    IF A > B THEN
      SELECT A, B INTO B, A;
    END IF;
    SUM := B - A;
    RES := RES || jsonb_build_object(
      'data', ARRAY[A, SUM, B],
      'answer', concat(SUM,' = ',B,' - ',A)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

-- AB ( A+B+X+Y ) XY
CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0_6(_quantity int) RETURNS jsonb AS $$
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
    SUM := A + B + X + Y;
    RES := RES || jsonb_build_object(
      'data', ARRAY[L, SUM, R],
      'answer', concat(SUM,' = ',A,' + ',B,' + ',X,' + ',Y)
    );
  END LOOP;
  RETURN RES;
END $$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION private.trainer__math_middle__complexity_0(_quantity int) RETURNS jsonb AS $$
BEGIN
  CASE (random()*6)::int
    WHEN 0 THEN
      RETURN private.trainer__math_middle__complexity_0_0(_quantity);
    WHEN 1 THEN
      RETURN private.trainer__math_middle__complexity_0_1(_quantity);
    WHEN 2 THEN
      RETURN private.trainer__math_middle__complexity_0_2(_quantity);
    WHEN 3 THEN
      RETURN private.trainer__math_middle__complexity_0_3(_quantity);
    WHEN 4 THEN
      RETURN private.trainer__math_middle__complexity_0_4(_quantity);
    WHEN 5 THEN
      RETURN private.trainer__math_middle__complexity_0_5(_quantity);
    WHEN 6 THEN
      RETURN private.trainer__math_middle__complexity_0_6(_quantity);
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE;
