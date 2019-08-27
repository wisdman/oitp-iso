-- DROP TABLE private.complexity_defaults CASCADE;
CREATE TABLE private.complexity_defaults (
  "trainer" public.trainer_type NOT NULL,

  "complexity" smallint NOT NULL DEFAULT 1,

  "previewTimeLimit" int NOT NULL DEFAULT 0,
  "playTimeLimit"    int NOT NULL DEFAULT 0,

  CONSTRAINT private__complexity_defaults__pkey PRIMARY KEY ("trainer"),

  CONSTRAINT private__complexity_defaults__check__complexity CHECK ("complexity" > 0),
  CONSTRAINT private__complexity_defaults__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT private__complexity_defaults__check__playTimeLimit CHECK ("playTimeLimit" >= 0)
);
