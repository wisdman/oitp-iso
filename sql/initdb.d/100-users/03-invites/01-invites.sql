-- DROP TABLE private.users_invites CASCADE;
CREATE TABLE private.users_invites (
  "id" char(64) NOT NULL DEFAULT public.unique_id(),

  "master" uuid DEFAULT NULL,
  "tarif" uuid DEFAULT NULL,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "options" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT private__users_invites__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__users_invites__check__id CHECK (public.check_unique_id("id")),
  CONSTRAINT private__users_invites__check__options CHECK (jsonb_typeof("options") = 'object'),

  CONSTRAINT private__users_invites__fkey__master FOREIGN KEY ("master")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE SET NULL
);
