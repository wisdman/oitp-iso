SET search_path = "$user";

CREATE TABLE private.trainer__words_lexis_paronyms__data (
  "id" integer NOT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_lexis_paronyms__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_lexis_paronyms__data__check__wordA
    CHECK (char_length(trim("wordA")) > 0),

  CONSTRAINT trainer__words_lexis_paronyms__data__check__wordB
    CHECK (char_length(trim("wordB")) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__words_lexis_paronyms__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_lexis_paronyms__data.id;

ALTER TABLE ONLY private.trainer__words_lexis_paronyms__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_lexis_paronyms__data__id__seq'::regclass);

CREATE UNIQUE INDEX trainer__words_lexis_paronyms__data__idx__unique__words
  ON private.trainer__words_lexis_paronyms__data USING btree ("wordA", "wordB");

CREATE OR REPLACE FUNCTION private.trainer__words_lexis_paronyms__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;
  _minItems smallint;
  _maxItems smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _minItems,
    _maxItems,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'words-lexis-paronyms';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-lexis-paronyms',
        'ui', 'words-lexis',
        'timeLimit', _playTimeLimit,
        'items', (array_agg("item"))[1:public.random(_minItems, _maxItems)]
      )
    FROM (
      SELECT
        (ROW_NUMBER() OVER() - 1) % _quantity AS "grp",
        "item"
      FROM (
        SELECT ARRAY["wordA", "wordB"] AS "item"
        FROM private.trainer__words_lexis_paronyms__data
        ORDER BY random()
        LIMIT _quantity * _maxItems
      ) AS t
    ) AS t
    GROUP BY "grp"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
