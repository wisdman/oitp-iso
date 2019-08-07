SET search_path = "$user";

-- SELECT * FROM private.trainer__space_waste_2d__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__space_waste_2d__config() RETURNS SETOF RECORD AS $$
DECLARE
  _pointsCount smallint := 5;

  _minItems smallint := 3;
  _maxItems smallint := 15;
  _itemsCount smallint;

  _minQuantity smallint := 2;
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
  FROM self.complexity('space-waste-2d');

  _itemsCount := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;
  _quantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    WITH groups AS (
      SELECT
        "grp",
        ARRAY[point(2, 98), point(2, 2)] || array_agg("point") AS "path"
      FROM (
        SELECT
          "grp",
          point(x, (ROW_NUMBER() OVER(PARTITION BY "grp")) * (100 / _pointsCount)) AS "point"
        FROM (
          SELECT
            (ROW_NUMBER() OVER() - 1) % _quantity + 1 AS "grp",
            floor(random() * 70 + 23) AS x
          FROM generate_series(1, _quantity * _pointsCount)
        ) AS t
      ) AS t
      GROUP BY "grp"
    ), figures AS (
      SELECT
        "grp",
        (SELECT array_agg(point(p[0] * -1, p[1])) FROM unnest("path") AS p) AS "path",
        floor(random() * 180) AS "fi",
        TRUE AS "correct"
      FROM groups

      UNION ALL

      SELECT
        "grp",
        "path",
        floor(random() * 180) AS "fi",
        FALSE AS "correct"
      FROM groups
      FULL JOIN generate_series(1, _itemsCount - 1) ON TRUE
    ), items AS (
      SELECT
        "grp",
        jsonb_build_object(
          'data', concat('data:image/svg+xml;base64,', encode(concat(
            '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="-70 -70 140 140"><polygon points="',
            (SELECT string_agg(concat(p[0],',',p[1]), ' ') FROM unnest("path") AS p),
            '" style="fill:#aaa;stroke:#333;stroke-width:4"/></svg>'
          )::bytea, 'base64')),
          'correct', "correct"
        ) AS "item"
      FROM (
        SELECT
          "grp",
          -- Move to center
          (SELECT array_agg(point((p[0] - dx)::int, (p[1] - dy)::int)) FROM unnest("path") AS p) AS "path",
          "correct"
        FROM (
          SELECT
            "grp",
            "path",
            -- Aggregate
            (SELECT avg(p[0]) FROM unnest("path") AS p) AS "dx",
            (SELECT avg(p[1]) FROM unnest("path") AS p) AS "dy",
            "correct"
          FROM (
            SELECT
              "grp",
              -- rotate
              (SELECT array_agg(point(p[0] * cos(fi) - p[1]*sin(fi),  p[0] * sin(fi) + p[1] * cos(fi)))
               FROM unnest("path") AS p) AS "path",
              "correct"
            FROM figures
          ) AS t
        ) AS t
      ) AS t
    )
    SELECT
      jsonb_build_object(
        'id', 'space-waste-2d',
        'ui', 'space-question-waste',

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', array_agg("item" ORDER BY random())
      )
    FROM items
    GROUP BY "grp"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
