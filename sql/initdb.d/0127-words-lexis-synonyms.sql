SET search_path = "$user";

CREATE TABLE private.trainer__words_lexis_synonyms__data (
  "id" integer NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_lexis_synonyms__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_lexis_synonyms__data__check__wordA
    CHECK (char_length(trim("wordA")) > 0),

  CONSTRAINT trainer__words_lexis_synonyms__data__check__wordB
    CHECK (char_length(trim("wordB")) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__words_lexis_synonyms__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_lexis_synonyms__data.id;

ALTER TABLE ONLY private.trainer__words_lexis_synonyms__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_lexis_synonyms__data__id__seq'::regclass);

CREATE UNIQUE INDEX trainer__words_lexis_synonyms__data__idx__unique__words
  ON private.trainer__words_lexis_synonyms__data USING btree ("wordA", "wordB");

-- SELECT * FROM private.trainer__words_lexis_synonyms__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__words_lexis_synonyms__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 1;
  _maxQuantity smallint := 3;
  _quantity smallint;

  _minItems smallint := 4;
  _maxItems smallint := 10;
  _itemsCount smallint;

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
  WHERE "trainer" = 'words-lexis-synonyms';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;
  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-lexis-synonyms',
        'ui', 'words-lexis',

        'timeLimit', _timeLimit  * _itemsCount,
        'complexity', _complexity,

        'items', array_agg("item")
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER() - 1) % _quantity AS "grp",
        "item"
      FROM (
        SELECT ARRAY["wordA", "wordB"] AS "item"
        FROM private.trainer__words_lexis_synonyms__data
        ORDER BY random()
        LIMIT _quantity * _itemsCount
      ) AS t
    ) AS t
    GROUP BY "grp"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
