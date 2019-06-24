SET search_path = "$user";

CREATE TABLE private.complexity (
  "owner" uuid NOT NULL,
  "trainer" public.trainer__type NOT NULL,

  "ts" timestamp without time zone NOT NULL,
  "complexity" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT complexity__idx__pkey PRIMARY KEY ("owner", "trainer"),

  CONSTRAINT complexity__check__complexity CHECK (jsonb_typeof("complexity") = 'object'),

  CONSTRAINT complexity__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);