SET search_path = "$user";

CREATE TABLE private.trainer__matrix_sequence_pattern__data (
  "id" integer NOT NULL,
  "data" smallint[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__matrix_sequence_pattern__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__matrix_sequence_pattern__data__check__data CHECK (array_length("data", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__matrix_sequence_pattern__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__matrix_sequence_pattern__data.id;

ALTER TABLE ONLY private.trainer__matrix_sequence_pattern__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__matrix_sequence_pattern__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__matrix_sequence_pattern__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;

  _matrixSize smallint;

  _showSuccess bool;
  _useColors bool;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'matrixSize')::smallint,
    ("complexity"->'showSuccess')::bool,
    ("complexity"->'useColors')::bool,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _matrixSize,
    _showSuccess,
    _useColors,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'matrix-sequence-pattern';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'matrix-sequence-pattern',
        'ui', 'matrix-sequence-play',
        'timeLimit', _playTimeLimit,
        'matrix', "data",
        'showSuccess', _showSuccess,
        'useColors', _useColors
      )
    FROM private.trainer__matrix_sequence_pattern__data
    WHERE array_length("data", 1) = _matrixSize
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
