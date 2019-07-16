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
) WITH (OIDS = FALSE);

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

CREATE OR REPLACE FUNCTION private.trainer__text_letters__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;
  _maxLength smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'maxLength')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _maxLength,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'text-letters';

  RETURN QUERY (
    SELECT
      unnest(ARRAY[jsonb_build_object(
        'id', 'text-letters',
        'ui', 'text-letters-preview',
        'timeLimit', _showTimeLimit,
        'data', "data"
      ),
      jsonb_build_object(
        'id', 'text-letters',
        'ui', 'text-letters',
        'timeLimit', _playTimeLimit,
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
