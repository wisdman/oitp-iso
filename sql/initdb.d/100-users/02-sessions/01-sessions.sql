-- DROP TABLE private.users_sessions CASCADE;
CREATE UNLOGGED TABLE private.users_sessions (
  "id"    char(64) NOT NULL DEFAULT public.unique_id(),
  "owner" uuid     NOT NULL,

  "ts"   timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL
    DEFAULT timezone('UTC', now() + private.get_config_as_text('sessionInterval')::interval),

  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting

  CONSTRAINT private__users_sessions__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__users_sessions__check__id CHECK (public.check_unique_id("id")),

  CONSTRAINT private__users_sessions__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX private__users_sessions__idx__ts_expires ON private.users_sessions USING btree ("ts", "expires");

