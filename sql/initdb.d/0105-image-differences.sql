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
);

-- SELECT * FROM private.trainer__image_differences__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__image_differences__config() RETURNS SETOF RECORD AS $$
DECLARE
  _minQuantity smallint := 2;
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
  WHERE "trainer" = 'image-differences';

  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT WHERE FALSE
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
