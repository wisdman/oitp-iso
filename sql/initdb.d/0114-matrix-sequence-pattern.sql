SET search_path = "$user";

CREATE TABLE private.trainer__matrix_sequence_pattern__data (
  "id" integer NOT NULL,
  "data" smallint[] NOT NULL,

  "matrixSize" smallint NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__matrix_sequence_pattern__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__matrix_sequence_pattern__data__check__data CHECK (array_length("data", 1) > 0),
  CONSTRAINT trainer__matrix_sequence_pattern__data__check__matrixSize CHECK ("matrixSize" > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__matrix_sequence_pattern__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__matrix_sequence_pattern__data.id;

ALTER TABLE ONLY private.trainer__matrix_sequence_pattern__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__matrix_sequence_pattern__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__matrix_sequence_pattern__data__matrixSize()
RETURNS trigger AS $$
BEGIN
  NEW."matrixSize" = array_length(NEW."data", 1);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trainer__matrix_sequence_pattern__data__matrixSize__trigger
  BEFORE INSERT OR UPDATE ON private.trainer__matrix_sequence_pattern__data FOR EACH ROW
  EXECUTE PROCEDURE private.trainer__matrix_sequence_pattern__data__matrixSize();

CREATE INDEX trainer__matrix_sequence_pattern__data__idx__matrixSize
  ON private.trainer__matrix_sequence_pattern__data USING btree ("matrixSize");

-- SELECT * FROM private.trainer__matrix_sequence_pattern__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__matrix_sequence_pattern__config() RETURNS SETOF RECORD AS $$
DECLARE
  _matrixSizes smallint[] := ARRAY(
                              SELECT DISTINCT "matrixSize"
                              FROM private.trainer__matrix_sequence_pattern__data
                              ORDER BY "matrixSize"
                            );
  _matrixSize smallint;

  _showSuccess boolean := TRUE;
  _useColors boolean := FALSE;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;
  _quantity smallint;

  _timeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "timeLimit",
    "complexity"
  INTO
    _timeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'matrix-sequence-pattern';

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];
  _quantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'matrix-sequence-pattern',
        'ui', 'matrix-sequence-play',

        'timeLimit', _timeLimit,
        'complexity', _complexity,

        'matrix', "data",

        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM private.trainer__matrix_sequence_pattern__data
    WHERE "matrixSize" = _matrixSize
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
