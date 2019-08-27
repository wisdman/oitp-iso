-- DROP TABLE private.users_relations CASCADE;
CREATE TABLE private.users_relations (
  "master" uuid NOT NULL,
  "slave" uuid NOT NULL,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT private__users_relations__pkey PRIMARY KEY ("master", "slave"),

  CONSTRAINT private__users_relations__fkey__master FOREIGN KEY ("master")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT private__users_relations__fkey__slave FOREIGN KEY ("slave")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

