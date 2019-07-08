SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__image_fields__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _minQuantity smallint;
  _maxQuantity smallint;
  _quantity smallint;

  _answersCount smallint;

  _configs jsonb := '[]'::jsonb;
  _icons int[] := '{}'::int[];
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    ("complexity"->'minQuantity')::smallint,
    ("complexity"->'maxQuantity')::smallint,
    ("complexity"->'answersCount')::smallint
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _minItems,
    _maxItems,
    _minQuantity,
    _maxQuantity,
    _answersCount
  FROM private.complexity_defaults
  -- FROM public.self_complexity
  WHERE "trainer" = 'image-fields';

  _quantity := public.random_in_range(_minQuantity, _maxQuantity);

  FOR counter in 1.._quantity LOOP
    WITH correct AS (
      DELETE FROM icons_data WHERE "icon" IN (
        SELECT "icon" FROM icons_data LIMIT public.random_in_range(_minItems, _maxItems)
      ) RETURNING "icon"
    )
    SELECT
      _configs || jsonb_build_object(
        'id', 'image-fields',
        'ui', 'image-fields-preview',
        'timeLimit', _showTimeLimit,
        'items', "icons"
      ),
      _icons || "icons"
    INTO
      _configs,
      _icons
    FROM (
      SELECT array_agg("icon") AS "icons"
      FROM correct
    ) t;
  END LOOP;

  RETURN QUERY (
    WITH incorrect AS (
      DELETE FROM icons_data WHERE "icon" IN (
        SELECT "icon" FROM icons_data LIMIT _answersCount
      ) RETURNING "icon"
    )
    SElECT "config" FROM jsonb_array_elements(_configs) AS "config"
    UNION ALL
    SELECT
      jsonb_build_object(
        'id', 'image-fields',
        'ui', 'image-fields-question',
        'timeLimit', _playTimeLimit,
        'items', array_agg("item")
      ) AS "config"
    FROM (
      SELECT "item"
      FROM (
        SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item" FROM incorrect
        UNION ALL
        SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item" FROM unnest(_icons) AS "icon"
      ) AS i
      ORDER BY random()
      LIMIT _answersCount
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
