SET search_path = "$user";

CREATE TABLE private.trainer__words_questions_waste__data (
  "id" integer NOT NULL,

  "items" jsonb[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_questions_waste__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_questions_waste__data__check__items
    CHECK (array_length("items", 1) > 0)
);

CREATE SEQUENCE private.trainer__words_questions_waste__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_questions_waste__data.id;

ALTER TABLE ONLY private.trainer__words_questions_waste__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_questions_waste__data__id__seq'::regclass);

-- SELECT * FROM private.trainer__words_questions_waste__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__words_questions_waste__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 3;
  _maxQuantity smallint := 6;
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
  FROM self.complexity('words-questions-waste');

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-questions-waste',
        'ui', 'words-questions-waste',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', (SELECT array_agg(v ORDER BY random()) FROM unnest("items") AS v)
      )
    FROM private.trainer__words_questions_waste__data
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
