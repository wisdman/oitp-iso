SET search_path = "$user";

CREATE TABLE private.trainer__words_column__data (
  "id" integer NOT NULL,

  "word" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_column__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_column__data__check__word
    CHECK (char_length(trim("word")) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__words_column__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_column__data.id;

ALTER TABLE ONLY private.trainer__words_column__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_column__data__id__seq'::regclass);

CREATE UNIQUE INDEX trainer__words_column__data__idx__unique__word
  ON private.trainer__words_column__data USING btree ("word");

CREATE OR REPLACE FUNCTION private.trainer__words_column__config() RETURNS SETOF RECORD AS $$
DECLARE
  _itemTimeLimit smallint;
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'itemTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _itemTimeLimit,
    _playTimeLimit,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'words-column';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-column',
        'ui', 'words-column',
        'previewTimeLimit', _itemTimeLimit * array_length("items", 1),
        'timeLimit', _playTimeLimit,
        'items', "items"
      ) AS "config"
    FROM (
      SELECT
        (array_agg("word"))[1:public.random(_minItems, _maxItems)] AS "items"
      FROM (
        SELECT
          (ROW_NUMBER() OVER() - 1) % _quantity AS "grp",
          "word"
        FROM (
          SELECT "word"
          FROM private.trainer__words_column__data
          ORDER BY random()
          LIMIT _quantity * _maxItems
        ) AS t
      ) AS t
      GROUP BY "grp"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
