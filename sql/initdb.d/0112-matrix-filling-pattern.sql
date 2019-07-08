SET search_path = "$user";

CREATE TABLE private.trainer__matrix_filling_pattern__data (
  "id" integer NOT NULL,
  "data" smallint[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__matrix_filling_pattern__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__matrix_filling_pattern__data__check__data CHECK (array_length("data", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__matrix_filling_pattern__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__matrix_filling_pattern__data.id;

ALTER TABLE ONLY private.trainer__matrix_filling_pattern__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__matrix_filling_pattern__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__matrix_filling_pattern__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;
  _questionTimeLimit smallint;

  _matrixSize smallint;

  _minQuantity smallint;
  _maxQuantity smallint;

  _answersCount smallint;

  _maxIncorrect smallint := 20;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'questionTimeLimit')::smallint,
    ("complexity"->'matrixSize')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint,
    ("complexity"->'answersCount')::smallint
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _questionTimeLimit,
    _matrixSize,
    _minQuantity,
    _maxQuantity,
    _answersCount
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'matrix-filling-pattern';

  RETURN QUERY (
    WITH patterns AS (
      SELECT
        "data",
        (SELECT array_agg(i) FROM private.icons_get(p."itemsCount") AS t(i int)) AS "correct",
        (SELECT array_agg(i) FROM private.icons_get(_maxIncorrect - p."itemsCount") AS t(i int)) AS "incorrect"
      FROM (
        SELECT
          "data",
          array_length(ARRAY(SELECT DISTINCT unnest("data")), 1) AS "itemsCount"
        FROM private.trainer__matrix_filling_pattern__data
        WHERE array_length("data", 1) = _matrixSize
        ORDER BY random()
        LIMIT public.random_in_range(_minQuantity, _maxQuantity)
      ) AS p
    )

    SELECT
      unnest(ARRAY[jsonb_build_object(
        'id', 'matrix-filling-pattern',
        'ui', 'matrix-images-preview',
        'timeLimit', _showTimeLimit,
        'items', "correct",
        'matrix', "data"
      ),
      jsonb_build_object(
        'id', 'matrix-filling-pattern',
        'ui', 'matrix-images-filling',
        'timeLimit', _playTimeLimit,
        'items', "correct" || "incorrect",
        'matrix', "data"
      )])
    FROM patterns

    UNION ALL

    SELECT
      jsonb_build_object(
        'id', 'matrix-filling-pattern',
        'ui', 'matrix-images-question',
        'timeLimit', _questionTimeLimit,
        'items', array_agg("item")
      ) AS "config"
    FROM (
      SELECT "item"
      FROM (
        SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
        FROM (SELECT unnest("correct") AS "icon" FROM patterns) AS t
        UNION ALL
        SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
        FROM private.icons_get(_answersCount) AS t("icon" int)
      ) AS i
      ORDER BY random()
      LIMIT _answersCount
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
