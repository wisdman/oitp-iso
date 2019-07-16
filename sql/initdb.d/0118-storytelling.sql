SET search_path = "$user";

CREATE TABLE private.trainer__storytelling__data (
  "id" integer NOT NULL,
  "questions" jsonb NOT NULL DEFAULT '[]'::jsonb,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__storytelling__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__storytelling__data__check__questions
    CHECK (jsonb_typeof("questions") = 'array' AND jsonb_array_length("questions") > 0)
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.trainer__storytelling__config() RETURNS SETOF RECORD AS $$
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
  WHERE "trainer" = 'storytelling';

  RETURN QUERY (
    SELECT
      unnest(
        ARRAY[jsonb_build_object(
          'id', 'storytelling',
          'ui', 'storytelling',
          'image', (SELECT id FROM private.relax_get(1) AS t(id int)),
          'audio', "id"
        )] ||
        (SELECT
          array_agg(
            jsonb_build_object(
              'id', 'storytelling',
              'ui', 'text-question-tof',
              'timeLimit', _playTimeLimit
            ) || "question"
          )
        FROM jsonb_array_elements("questions") AS "question")
      )
    FROM (
      SELECT "id", "questions"
      FROM private.trainer__storytelling__data
      ORDER BY random()
      LIMIT _quantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
