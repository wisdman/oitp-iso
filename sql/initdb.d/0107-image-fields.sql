SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.trainer__image_fields__config() RETURNS SETOF RECORD AS $$
DECLARE
  _showTimeLimit smallint;
  _playTimeLimit smallint;

  _minItems smallint;
  _maxItems smallint;

  _quantity smallint;

  _answersCount smallint;
BEGIN
  SELECT
    ("complexity"->'showTimeLimit')::smallint,
    ("complexity"->'playTimeLimit')::smallint,
    ("complexity"->'minItems')::smallint,
    ("complexity"->'maxItems')::smallint,
    public.random(("complexity"->'minQuantity')::int, ("complexity"->'maxQuantity')::int),
    ("complexity"->'answersCount')::smallint
  INTO
    _showTimeLimit,
    _playTimeLimit,
    _minItems,
    _maxItems,
    _quantity,
    _answersCount
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'image-fields';

  RETURN QUERY (
    WITH correct AS (
      SELECT (array_agg("icon"))[1:public.random(_minItems, _maxItems)] AS "items"
      FROM (
        SELECT
          (ROW_NUMBER() OVER() - 1) % _quantity AS "grp",
          "icon"
        FROM private.icons_get(_quantity * _maxItems) AS t("icon" int)
      ) AS i
      GROUP BY "grp"
    )

    SELECT "config"
    FROM (
      SELECT
        1 AS "ord",
        jsonb_build_object(
          'id', 'image-fields',
          'ui', 'image-fields-preview',
          'timeLimit', _showTimeLimit,
          'items', "items"
        ) AS "config"
      FROM correct

      UNION ALL

      SELECT
        2 AS "ord",
        jsonb_build_object(
          'id', 'image-fields',
          'ui', 'image-fields-question',
          'timeLimit', _playTimeLimit,
          'items', (array_agg("item" ORDER BY random()))[1:_answersCount]
        ) AS "config"
      FROM (
        SELECT jsonb_build_object('icon', "icon", 'correct', TRUE) AS "item"
        FROM ( SELECT unnest("items") AS "icon" FROM correct ) AS i1

        UNION ALL

        SELECT jsonb_build_object('icon', "icon", 'correct', FALSE) AS "item"
        FROM private.icons_get(_answersCount) AS i2("icon" int)

      ) AS t
    ) AS t
    ORDER BY "ord"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
