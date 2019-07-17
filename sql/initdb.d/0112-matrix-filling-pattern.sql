SET search_path = "$user";

CREATE TABLE private.trainer__matrix_filling_pattern__data (
  "id" integer NOT NULL,
  "data" smallint[] NOT NULL,

  "matrixSize" smallint NOT NULL,
  "itemsCount" smallint NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__matrix_filling_pattern__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__matrix_filling_pattern__data__check__data CHECK (array_length("data", 1) > 0),

  CONSTRAINT trainer__matrix_filling_pattern__data__check__matrixSize CHECK ("matrixSize" > 0),
  CONSTRAINT trainer__matrix_filling_pattern__data__check__itemsCount CHECK ("itemsCount" > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__matrix_filling_pattern__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__matrix_filling_pattern__data.id;

ALTER TABLE ONLY private.trainer__matrix_filling_pattern__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__matrix_filling_pattern__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__matrix_filling_pattern__data__matrixSize_and_itemsCount()
RETURNS trigger AS $$
BEGIN
  NEW."matrixSize" = array_length(NEW."data", 1);
  NEW."itemsCount" = array_length(ARRAY(SELECT DISTINCT unnest(NEW."data")), 1);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trainer__matrix_filling_pattern__data__matrixSize_and_itemsCount__trigger
  BEFORE INSERT OR UPDATE ON private.trainer__matrix_filling_pattern__data FOR EACH ROW
  EXECUTE PROCEDURE private.trainer__matrix_filling_pattern__data__matrixSize_and_itemsCount();

CREATE INDEX trainer__matrix_filling_pattern__data__idx__matrixSize
  ON private.trainer__matrix_filling_pattern__data USING btree ("matrixSize");

CREATE INDEX trainer__matrix_filling_pattern__data__idx__itemsCount
  ON private.trainer__matrix_filling_pattern__data USING btree ("itemsCount");

-- SELECT * FROM private.trainer__matrix_filling_pattern__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__matrix_filling_pattern__config() RETURNS SETOF RECORD AS $$
DECLARE
  _matrixSizes smallint[] := ARRAY(
                              SELECT DISTINCT "matrixSize"
                              FROM private.trainer__matrix_filling_pattern__data
                              ORDER BY "matrixSize"
                            );
  _matrixSize smallint;

  _maxItems smallint := (SELECT MAX("itemsCount") FROM private.trainer__matrix_filling_pattern__data);
  _itemsCount smallint;

  _columns smallint;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 7;
  _quantity smallint;

  _maxAnswersCount smallint := 25;
  _rowAnswersCount smallint := 5;
  _answersCount smallint;

  _previewTimeLimit smallint;
  _timeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "timeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _timeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'matrix-filling-pattern';

  _matrixSize := _matrixSizes[LEAST(_complexity, array_length(_matrixSizes, 1))];

  _columns := GREATEST(SQRT(_matrixSize)::smallint, _rowAnswersCount);
  _itemsCount := (_maxItems * 2 / _columns + 1) * _columns;

  _quantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);
  _answersCount := LEAST((_maxItems * _complexity / _rowAnswersCount + 1) * _rowAnswersCount, _maxAnswersCount);

  RETURN QUERY (
    WITH patterns AS (
      SELECT
        "data",
        (SELECT array_agg(i) FROM private.icons_get("itemsCount") AS t(i int)) AS "correct",
        (SELECT array_agg(i) FROM private.icons_get(_itemsCount - "itemsCount") AS t(i int)) AS "incorrect"
      FROM private.trainer__matrix_filling_pattern__data
      WHERE "matrixSize" = _matrixSize
      ORDER BY random()
      LIMIT _quantity
    ), questions AS (
      SELECT "item"
      FROM (
        SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
        FROM (SELECT unnest("correct") AS "icon" FROM patterns) AS i1

        UNION ALL

        SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
        FROM private.icons_get(_answersCount) AS i2("icon" int)
      ) AS i
      ORDER BY random()
      LIMIT _answersCount
    )

    SELECT "config"
    FROM (
      SELECT
        1 AS "ord",
        unnest(ARRAY[jsonb_build_object(
          'id', 'matrix-filling-pattern',
          'ui', 'matrix-images-preview',

          'timeLimit', _previewTimeLimit,
          'complexity', _complexity,

          'items', "correct",
          'matrix', "data"
        ),
        jsonb_build_object(
          'id', 'matrix-filling-pattern',
          'ui', 'matrix-images-filling',

          'timeLimit', _timeLimit,
          'complexity', _complexity,

          'items', "correct" || "incorrect",
          'matrix', "data"
        )]) AS "config"
      FROM patterns

      UNION ALL

      SELECT
        2 AS "ord",
        jsonb_build_object(
          'id', 'matrix-filling-pattern',
          'ui', 'matrix-images-question',

          'timeLimit', 0,
          'complexity', _complexity,

          'items', array_agg("item")
        ) AS "config"
      FROM questions

      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
