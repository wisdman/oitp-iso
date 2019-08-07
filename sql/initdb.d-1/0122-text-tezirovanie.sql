SET search_path = "$user";

CREATE TABLE private.trainer__text_tezirovanie__data (
  "id" integer NOT NULL,

  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__text_tezirovanie__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__text_tezirovanie__data__check__data
    CHECK (char_length(trim("data")) > 0)
);

CREATE SEQUENCE private.trainer__text_tezirovanie__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__text_tezirovanie__data.id;

ALTER TABLE ONLY private.trainer__text_tezirovanie__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__text_tezirovanie__data__id__seq'::regclass);

-- SELECT * FROM private.trainer__text_tezirovanie__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__text_tezirovanie__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 1;
  _maxQuantity smallint := 5;
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
  FROM self.complexity('text-tezirovanie');

  _quantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'text-tezirovanie',
        'ui', 'text-tezirovanie',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'data', "data"
      )
    FROM private.trainer__text_tezirovanie__data
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
