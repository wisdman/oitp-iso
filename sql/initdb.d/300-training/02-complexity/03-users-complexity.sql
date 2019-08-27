-- DROP TABLE private.users_complexity CASCADE;
CREATE TABLE private.users_complexity (
  "trainer" public.trainer_type NOT NULL,
  "owner" uuid NOT NULL,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "complexity" smallint NOT NULL DEFAULT 1,

  "previewTimeLimit" int NOT NULL DEFAULT 0,
  "playTimeLimit"    int NOT NULL DEFAULT 0,


  CONSTRAINT private__users_complexity__pkey PRIMARY KEY ("trainer", "owner", "ts"),

  CONSTRAINT private__users_complexity__check__complexity CHECK ("complexity" > 0),
  CONSTRAINT private__users_complexity__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT private__users_complexity__check__playTimeLimit CHECK ("playTimeLimit" >= 0),

  CONSTRAINT private__users_complexity__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);
