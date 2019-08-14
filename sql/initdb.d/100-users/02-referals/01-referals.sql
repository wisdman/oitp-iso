-- DROP TABLE private.users_referals CASCADE;
CREATE TABLE private.users_referals (
  "master" uuid NOT NULL,
  "slave" uuid NOT NULL,

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT users_referals__pkey PRIMARY KEY ("master", "slave"),

  CONSTRAINT users_referals__fkey__master FOREIGN KEY ("master")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT users_referals__fkey__slave FOREIGN KEY ("slave")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);
