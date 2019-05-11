SET search_path = "$user";

CREATE TYPE public.trainers_lexicon_relation AS ENUM (
  'antonyms', -- Антонимы
  'paronyms', -- Паронимы
  'synonyms'  -- Синонимы
);

CREATE TABLE private.trainers_lexicon (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "word"        text NOT NULL,
  "group"       text DEFAULT NULL,
  "definitions" text[] NOT NULL DEFAULT '{}'::text[],

  "forColumns" bool NOT NULL DEFAULT FALSE,
  "color" varchar(7) DEFAULT NULL,

  CONSTRAINT trainers_lexicon__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainers_lexicon__check__color CHECK ("color" ~ '^#[0-9a-f]{6}$')
) WITH (OIDS = FALSE);

CREATE UNIQUE INDEX trainers_lexicon__idx__unique_word
ON private.trainers_lexicon USING btree (LOWER("word"));

CREATE SEQUENCE private.trainers_lexicon__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainers_lexicon.id;

ALTER TABLE ONLY private.trainers_lexicon ALTER COLUMN id
SET DEFAULT nextval('private.trainers_lexicon__id__seq'::regclass);

CREATE TABLE private.trainers_lexicon_relations (
  "type" public.trainers_lexicon_relation NOT NULL,

  "word_a" integer NOT NULL,
  "word_b" integer NOT NULL,

  CONSTRAINT trainers_lexicon_relations__idx__pkey PRIMARY KEY ("type", "word_a", "word_b"),

  CHECK ("word_a" < "word_b"),

  CONSTRAINT trainers_lexicon_relations__fkey__a
    FOREIGN KEY ("word_a")
    REFERENCES private.trainers_lexicon("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT trainers_lexicon_relations__fkey__b
    FOREIGN KEY ("word_b")
    REFERENCES private.trainers_lexicon("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE TABLE private.trainers_lexicon_pairs (
  "word_a" integer NOT NULL,
  "word_b" integer NOT NULL,

  CONSTRAINT trainers_lexicon_pairs__idx__pkey PRIMARY KEY ("word_a", "word_b"),

  CONSTRAINT trainers_lexicon_pairs__fkey__a
    FOREIGN KEY ("word_a")
    REFERENCES private.trainers_lexicon("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT trainers_lexicon_pairs__fkey__b
    FOREIGN KEY ("word_b")
    REFERENCES private.trainers_lexicon("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE MATERIALIZED VIEW public.trainers_lexicon AS
  SELECT
    t."id" as "id",
    t."enabled" as "enabled",

    t."word" as "word",
    t."group" as "group",
    t."definitions" as "definitions",

    COALESCE(
      json_agg(
        r1.word
      ) FILTER (WHERE r1.id IS NOT NULL),
      '[]'
    ) AS "antonyms",
    COALESCE(
      json_agg(
        r2.word
      ) FILTER (WHERE r2.id IS NOT NULL),
      '[]'
    ) AS "paronyms",
    COALESCE(
      json_agg(
        r3.word
      ) FILTER (WHERE r3.id IS NOT NULL),
      '[]'
    ) AS "synonyms"
  FROM private.trainers_lexicon t
  LEFT JOIN (
    SELECT r.word_a AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_b = l.id
    WHERE r."type" = 'antonyms'
    UNION
    SELECT r.word_b AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_a = l.id
    WHERE r."type" = 'antonyms'
  ) r1 ON r1.id = t.id
  LEFT JOIN (
    SELECT r.word_a AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_b = l.id
    WHERE r."type" = 'paronyms'
    UNION
    SELECT r.word_b AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_a = l.id
    WHERE r."type" = 'paronyms'
  ) r2 ON r2.id = t.id
  LEFT JOIN (
    SELECT r.word_a AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_b = l.id
    WHERE r."type" = 'synonyms'
    UNION
    SELECT r.word_b AS id, l.word AS "word" FROM private.trainers_lexicon_relations r
    LEFT JOIN private.trainers_lexicon l ON r.word_a = l.id
    WHERE r."type" = 'synonyms'
  ) r3 ON r3.id = t.id
  GROUP BY t.id;

GRANT SELECT ON public.trainers_lexicon TO api;