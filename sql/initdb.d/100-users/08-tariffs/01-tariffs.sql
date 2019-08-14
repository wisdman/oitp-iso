-- DROP TABLE private.users_referals CASCADE;
CREATE TABLE private.users_tariffs (
  "tariff" uuid NOT NULL,
  "owner" uuid NOT NULL,

  "issue" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT users_tariffs__pkey PRIMARY KEY ("tariff", "owner"),

  CONSTRAINT users_tariffs__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT users_referals__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX users_tariffs__idx__issue ON private.users_tariffs USING btree ("issue");
