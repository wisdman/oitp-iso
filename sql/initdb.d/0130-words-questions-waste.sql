SET search_path = "$user";

CREATE TABLE private.trainer__words_questions_waste__data (
  "id" integer NOT NULL,

  "items" jsonb[] NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__words_questions_waste__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__words_questions_waste__data__check__items
    CHECK (array_length("items", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__words_questions_waste__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__words_questions_waste__data.id;

ALTER TABLE ONLY private.trainer__words_questions_waste__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__words_questions_waste__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__words_questions_waste__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'words-questions-waste';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'words-questions-waste',
        'ui', 'words-questions-waste',
        'timeLimit', _playTimeLimit,
        'items', (SELECT array_agg(v ORDER BY random()) FROM unnest("items") AS v)
      )
    FROM private.trainer__words_questions_waste__data
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
