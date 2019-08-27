-- DROP TABLE private.users_tariffs CASCADE;
CREATE TABLE private.users_tariffs (
  "tariff" uuid NOT NULL,
  "owner" uuid NOT NULL,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT private__users_tariffs__pkey PRIMARY KEY ("tariff", "owner"),

  CONSTRAINT private__users_tariffs__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT private__users_referals__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX private__users_tariffs__idx__ts ON private.users_tariffs USING btree ("ts");
