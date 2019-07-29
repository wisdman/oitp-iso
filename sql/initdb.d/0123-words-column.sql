SET search_path = "$user";

CREATE TABLE private.trainer__words_column__data (
  "id" integer NOT NULL,

  "word" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_column__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_column__data__check__word
    CHECK (char_length(trim("word")) > 0)
);

CREATE SEQUENCE private.trainer__words_column__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_column__data.id;

ALTER TABLE ONLY private.trainer__words_column__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_column__data__id__seq'::regclass);

CREATE UNIQUE INDEX trainer__words_column__data__idx__unique__word
  ON private.trainer__words_column__data USING btree ("word");

-- SELECT * FROM private.trainer__words_column__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__words_column__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 2;
  _maxQuantity smallint := 6;
  _quantity smallint;

  _minItems smallint := 4;
  _maxItems smallint := 15;
  _itemsCount smallint;

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
  WHERE "trainer" = 'words-column';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-column',
        'ui', 'words-column',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', "items"
      ) AS "config"
    FROM (
      SELECT (array_agg("word"))[1:_itemsCount] AS "items"
      FROM (
        SELECT
          (ROW_NUMBER() OVER() - 1) % _quantity AS "grp",
          "word"
        FROM (
          SELECT "word"
          FROM private.trainer__words_column__data
          ORDER BY random()
          LIMIT _quantity * _itemsCount
        ) AS t
      ) AS t
      GROUP BY "grp"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
