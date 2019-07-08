SET search_path = "$user";

CREATE TABLE private.trainer__image_carpets__data (
  "id" integer NOT NULL,

  "complexity" smallint NOT NULL DEFAULT 0,
  "carpet" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__image_carpets__data__idx__pkey PRIMARY KEY ("group"),

  CONSTRAINT trainer__image_carpets__data__check__complexity CHECK ("complexity" >= 0),
  CONSTRAINT trainer__image_carpets__data__check__carpet
    CHECK (jsonb_typeof("carpet") = 'array' AND jsonb_array_length("carpet") > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__image_carpets__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__image_carpets__data.id;

ALTER TABLE ONLY private.trainer__image_carpets__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__image_carpets__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__image_carpets__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _complexity smallint;

  _minQuantity smallint;
  _maxQuantity smallint;

  _config RECORD;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _complexity,
    _minQuantity,
    _maxQuantity
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'image-carpets';

  FOR counter in 1.._quantity LOOP
    SELECT
      'image-carpets' AS "id",
      'image-carpets' AS "ui",
      (jsonb_array_length("items") * _itemTimeLimit)::smallint AS "timeLimit",
      jsonb_build_object('items', "items") AS "config"
    INTO
      _config
    FROM (

    ) AS t;
    RETURN NEXT _config;
  END LOOP;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;