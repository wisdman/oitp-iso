SET search_path = "$user";

CREATE TABLE private.trainer__table_pipe__data (
  "id" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__table_pipe__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__table_pipe__data__check__runes CHECK (array_length("runes", 1) > 0)
);

CREATE SEQUENCE private.trainer__table_pipe__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__table_pipe__data.id;

ALTER TABLE ONLY private.trainer__table_pipe__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__table_pipe__data__id__seq'::regclass);

-- SELECT * FROM private.trainer__table_pipe__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__table_pipe__config() RETURNS SETOF RECORD AS $$
DECLARE
  _matrixSizes smallint[] := ARRAY[10, 20, 30];
  _matrixSize smallint;

  _minQuantity smallint := 2;
  _maxQuantity smallint := 3;
  _quantity smallint;

  _previewTimeLimit smallint;
  _playTimeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "playTimeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _playTimeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'table-pipe';

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];
  _quantity := LEAST(GREATEST(_complexity, _minQuantity), _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'table-pipe',
        'ui', 'table-pipe',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', ARRAY[
          jsonb_build_object(
            'data', "runes"[1],
            'action', 'UP'
          ),
          jsonb_build_object(
            'data', "runes"[2],
            'action', 'DOWN'
          ),
          jsonb_build_object(
            'data', "runes"[3],
            'action', 'LEFT'
          ),
          jsonb_build_object(
            'data', "runes"[4],
            'action', 'RIGHT'
          )
        ],
        'matrix', "matrix"
      ) AS "config"
    FROM (
      SELECT
        (SELECT array_agg((random()*3)::smallint) FROM generate_series(1, _matrixSize) AS v WHERE s = s) AS "matrix",
        (SELECT (array_agg(r ORDER BY random()))[1:4] FROM unnest("runes") AS r) AS "runes"
      FROM private.trainer__table_pipe__data
      FULL JOIN generate_series(1, _quantity) AS s ON TRUE
      ORDER BY random()
      LIMIT _quantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
