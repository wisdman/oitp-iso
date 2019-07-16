SET search_path = "$user";

CREATE TABLE private.trainer__image_expressions__data (
  "id" integer NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__image_expressions__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__image_expressions__data__check__data CHECK (char_length("data") >= 0)
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__image_expressions__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'image-expressions';

  RETURN QUERY (
    WITH d AS (
      SELECT
        jsonb_build_object(
          'id', 'image-expressions',
          'ui', 'image-expressions-preview',
          'timeLimit', _showTimeLimit,
          'image', "id",
          'data', "data"
        ) AS "preview",
        jsonb_build_object(
          'id', 'image-expressions',
          'ui', 'image-expressions',
          'timeLimit', _playTimeLimit,
          'image', "id",
          'data', "data"
        ) AS "config"
      FROM private.trainer__image_expressions__data
      ORDER BY random()
      LIMIT _quantity
    )
    SELECT "config"
    FROM (
      SELECT 1 AS "ord", "config" FROM (SELECT "preview" AS "config" FROM d ORDER BY random()) AS t1
      UNION ALL
      SELECT 2 AS "ord", "config" FROM (SELECT "config" AS "config" FROM d ORDER BY random()) AS t2
    ) AS t
    ORDER BY "ord"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
