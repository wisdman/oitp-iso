SET search_path = "$user";

CREATE TABLE private.training (
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner" uuid NOT NULL,

  "ts" timestamp without time zone NOT NULL,

  "config" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "result" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT training__idx__pkey PRIMARY KEY ("id", "owner"),

  CONSTRAINT training__check__config CHECK (jsonb_typeof("config") = 'object'),
  CONSTRAINT training__check__result CHECK (jsonb_typeof("result") = 'object'),

  CONSTRAINT training__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);