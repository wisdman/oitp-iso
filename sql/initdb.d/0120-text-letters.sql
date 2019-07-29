SET search_path = "$user";

CREATE TABLE private.trainer__text_letters__data (
  "id" integer NOT NULL,
  "data" text NOT NULL,

  "length" integer NOT NULL,
  "runes" char[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__text_letters__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__text_letters__data__check__data CHECK (char_length(trim("data")) > 0)
);

CREATE SEQUENCE private.trainer__text_letters__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__text_letters__data.id;

ALTER TABLE ONLY private.trainer__text_letters__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__text_letters__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__text_letters__data__length_and_runes() RETURNS trigger AS $$
BEGIN
  NEW."length" = array_length(regexp_split_to_array(trim(NEW."data"), E'\\W+'), 1);
  SELECT array_agg((upper(left(c, 1)))::char) INTO NEW."runes"
  FROM unnest(regexp_split_to_array(trim(NEW."data"), E'\\W+')) AS c;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trainer__text_letters__data__length_and_runes__trigger
  BEFORE INSERT OR UPDATE ON private.trainer__text_letters__data FOR EACH ROW
  EXECUTE PROCEDURE private.trainer__text_letters__data__length_and_runes();

-- SELECT * FROM private.trainer__text_letters__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__text_letters__config() RETURNS SETOF RECORD AS $$
DECLARE
  _lengths smallint[] := ARRAY(SELECT DISTINCT "length" FROM private.trainer__text_letters__data ORDER BY "length");
  _maxLength smallint;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;
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
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'text-letters';

  _maxLength := _lengths[LEAST(_complexity, array_length(_lengths, 1))];
  _quantity := LEAST(GREATEST(_complexity, _minQuantity) + random()::smallint, _maxQuantity);

  RETURN QUERY (
    SELECT
      unnest(ARRAY[jsonb_build_object(
        'id', 'text-letters',
        'ui', 'text-letters-preview',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'data', "data"
      ),
      jsonb_build_object(
        'id', 'text-letters',
        'ui', 'text-letters',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'runes', "runes",
        'data', "data"
      )])
    FROM (
      SELECT "data", "runes"
      FROM private.trainer__text_letters__data
      WHERE "length" <= _maxLength
      ORDER BY random()
      LIMIT _quantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
