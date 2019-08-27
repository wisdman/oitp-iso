-- DROP TABLE private.users_brain_charge CASCADE;
CREATE UNLOGGED TABLE private.users_brain_charge (
  "owner" uuid NOT NULL,
  "value" smallint NOT NULL DEFAULT (private.get_config('defaultBrainCharge')::smallint),
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  CONSTRAINT private__users_brain_charge__pkey PRIMARY KEY ("owner", "ts"),

  CONSTRAINT private__users_brain_charge__check__value CHECK ("value" >= 0 AND "value" <= 100),

  CONSTRAINT private__users_complexity__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);