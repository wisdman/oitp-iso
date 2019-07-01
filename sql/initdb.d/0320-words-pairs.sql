SET search_path = "$user";

CREATE TABLE private.trainer_words_pairs (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "wordA" text NOT NULL,
  "wordB" text NOT NULL,

  CONSTRAINT trainer_words_pairs__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_words_pairs__check__wordA CHECK (char_length("wordA") > 0),
  CONSTRAINT trainer_words_pairs__check__wordB CHECK (char_length("wordB") > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_pairs__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_pairs.id;

ALTER TABLE ONLY private.trainer_words_pairs ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_pairs__id__seq'::regclass);

CREATE UNIQUE INDEX trainer_words_pairs__idx__unique_wordA_and_wordB
  ON private.trainer_words_pairs USING btree ("wordA", "wordB");


CREATE VIEW admin.trainer_words_pairs AS
  SELECT
    t."id",
    t."enabled",

    t."wordA",
    t."wordB"
  FROM private.trainer_words_pairs AS t
  WHERE t."deleted" IS NULL;

GRANT SELECT ON  admin.trainer_words_pairs TO "api-admin";


CREATE VIEW public.trainer_words_pairs AS
  SELECT
    t."id",
    t."enabled",

    t."wordA",
    t."wordB"
  FROM private.trainer_words_pairs AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."enabled";

GRANT SELECT ON  public.trainer_words_pairs TO "api-public";