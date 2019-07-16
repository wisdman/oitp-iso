SET search_path = "$user";

CREATE TABLE private.trainer__text_tezirovanie__data (
  "id" integer NOT NULL,

  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__text_tezirovanie__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__text_tezirovanie__data__check__data
    CHECK (char_length(trim("data")) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__text_tezirovanie__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__text_tezirovanie__data.id;

ALTER TABLE ONLY private.trainer__text_tezirovanie__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__text_tezirovanie__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__text_tezirovanie__config() RETURNS SETOF RECORD AS $$
DECLARE
  _playTimeLimit smallint;
  _completed int[];
  _quantity smallint;
BEGIN
  SELECT
    ("complexity"->'playTimeLimit')::smallint,
    COALESCE((SELECT array_agg("value"::int) FROM jsonb_array_elements("complexity"->'completed')), '{}'::int[]),
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _playTimeLimit,
    _completed,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'text-tezirovanie';

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'text-tezirovanie',
        'ui', 'text-tezirovanie',
        'timeLimit', _playTimeLimit,
        'data', "data"
      )
    FROM private.trainer__text_tezirovanie__data
    ORDER BY random()
    LIMIT _quantity
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
