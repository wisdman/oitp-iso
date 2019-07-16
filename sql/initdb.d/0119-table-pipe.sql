SET search_path = "$user";

CREATE TABLE private.trainer__table_pipe__data (
  "id" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__table_pipe__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__table_pipe__data__check__runes CHECK (array_length("runes", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__table_pipe__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__table_pipe__data.id;

ALTER TABLE ONLY private.trainer__table_pipe__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__table_pipe__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__table_pipe__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;
  _matrixSize smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'matrixSize')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _matrixSize,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'table-pipe';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'table-pipe',
        'ui', 'table-pipe',
        'timeLimit', _playTimeLimit,
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
        'matrix', (SELECT array_agg(floor(random() * 4)) FROM generate_series(1, _matrixSize) AS s)
      ) AS "config"
    FROM (
      SELECT
        (SELECT (array_agg(r ORDER BY random()))[1:4] FROM unnest("runes") AS r) AS "runes"
      FROM (
        SELECT
          "runes"
        FROM (
          SELECT "runes" FROM private.trainer__table_pipe__data
          FULL JOIN generate_series(1, _quantity) ON TRUE
        ) AS t
        ORDER BY random()
        LIMIT _quantity
      ) AS t
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
