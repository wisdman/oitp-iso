SET search_path = "$user";

CREATE TABLE private.trainer_words_groups (
  "id"      integer NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "group" text   NOT NULL,
  "words" text[] NOT NULL,

  "isFullList" boolean NOT NULL DEFAULT FALSE,

  CONSTRAINT trainer_words_groups__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT trainer_words_groups__check__group CHECK (char_length("group") > 0),
  CONSTRAINT trainer_words_groups__check__words CHECK (array_length("words", 1) > 0)
) WITH (OIDS = FALSE);

CREATE SEQUENCE private.trainer_words_groups__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer_words_groups.id;

ALTER TABLE ONLY private.trainer_words_groups ALTER COLUMN id
SET DEFAULT nextval('private.trainer_words_groups__id__seq'::regclass);

CREATE UNIQUE INDEX trainer_words_groups__idx__unique_group ON private.trainer_words_groups USING btree ("group");
