SET search_path = "$user";

CREATE TABLE private.referals (
  "owner"   uuid      NOT NULL,
  "referal" uuid      NOT NULL,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT referals__idx__pkey PRIMARY KEY ("owner", "referal"),

  CONSTRAINT referals__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT referals__fkey__referal
    FOREIGN KEY ("referal")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);
