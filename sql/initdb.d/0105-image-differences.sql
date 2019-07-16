SET search_path = "$user";

CREATE TABLE private.trainer__image_differences__data (
  "imageA" smallint NOT NULL,
  "imageB" smallint NOT NULL,
  "differences" jsonb NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__image_differences__data__idx__pkey PRIMARY KEY ("imageA", "imageB"),

  CONSTRAINT trainer__image_differences__data__check__imageA CHECK ("imageA" >= 0),
  CONSTRAINT trainer__image_differences__data__check__imageB CHECK ("imageB" >= 0),

  CONSTRAINT trainer__image_differences__data__check__differences
    CHECK (jsonb_typeof("differences") = 'array' AND jsonb_array_length("differences") > 0)
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__image_differences__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _complexity smallint;

  _quantity smallint;

  _config RECORD;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'complexity')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int)
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _complexity,
    _quantity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'image-differences';

END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
