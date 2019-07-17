SET search_path = "$user";

CREATE TABLE private.trainer__text_reading__data (
  "id" integer NOT NULL,

  "data" text NOT NULL,
  "questions" jsonb NOT NULL DEFAULT '[]'::jsonb,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__text_reading__data__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer__text_reading__data__check__data
    CHECK (char_length(trim("data")) > 0),

  CONSTRAINT trainer__text_reading__data__check__questions
    CHECK (jsonb_typeof("questions") = 'array' AND jsonb_array_length("questions") > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer__text_reading__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__text_reading__data.id;

ALTER TABLE ONLY private.trainer__text_reading__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__text_reading__data__id__seq'::regclass);

CREATE TABLE private.trainer__text_reading__completed (
  "owner" uuid NOT NULL,
  "id" integer NOT NULL,

  CONSTRAINT trainer__text_reading__completed__idx__pkey PRIMARY KEY ("owner", "id"),

  CONSTRAINT trainer__text_reading__completed__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT trainer__text_reading__completed__fkey__id
    FOREIGN KEY ("id")
    REFERENCES private.trainer__text_reading__data("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

-- SELECT * FROM private.trainer__text_reading__config() AS t(config jsonb);
CREATE OR REPLACE FUNCTION private.trainer__text_reading__config() RETURNS SETOF RECORD AS $$
DECLARE
  _previewTimeLimit smallint;
  _timeLimit smallint;
  _complexity smallint;
BEGIN
  SELECT
    "previewTimeLimit",
    "timeLimit",
    "complexity"
  INTO
    _previewTimeLimit,
    _timeLimit,
    _complexity
  -- FROM private.complexity_defaults
  FROM self.complexity
  WHERE "trainer" = 'text-reading';

  RETURN QUERY (
    SELECT unnest(
      ARRAY[jsonb_build_object(
        'id', 'text-reading',
        'ui', 'text-reading',

        'timeLimit', _previewTimeLimit,
        'complexity', _complexity,

        'data', "data"
      )] || (
        SELECT
          array_agg(jsonb_build_object(
            'id', 'text-reading',
            'ui', 'text-question-tof',

            'timeLimit', _timeLimit,
            'complexity', _complexity
          ) || "question")
        FROM jsonb_array_elements("questions") AS "question"
      )
    ) FROM (
      SELECT "id", "data", "questions"
      FROM private.trainer__text_reading__data
      WHERE "id" NOT IN (
        SELECT "id"
        FROM private.trainer__text_reading__completed
        WHERE "owner" = current_setting('app.sessionUser')::uuid
      )
      ORDER BY random()
      LIMIT 1
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
