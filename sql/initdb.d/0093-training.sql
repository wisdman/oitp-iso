SET search_path = "$user";

CREATE TYPE public.training__type AS ENUM (
  'debug',    -- Отладочная
  'everyday', -- Ежедневная
  'once'      -- Разовая
);

CREATE TABLE private.training (
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner" uuid NOT NULL,

  "deleted" timestamp without time zone DEFAULT NULL,

  "type"      public.training__type NOT NULL,
  "timeLimit" smallint NOT NULL,

  "start"  timestamp without time zone NOT NULL DEFAULt timezone('UTC', now()),
  "finish" timestamp without time zone DEFAULT NULL,

  CONSTRAINT training__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT training__check__timeLimit CHECK ("timeLimit" >= 0),

  CONSTRAINT training__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX training__idx__deleted ON private.training USING btree ("deleted");
CREATE INDEX training__idx__finish ON private.training USING btree ("finish");
CREATE INDEX training__idx__owner ON private.training USING btree ("owner");
CREATE INDEX training__idx__start ON private.training USING btree ("start");
CREATE INDEX training__idx__type ON private.training USING btree ("type");
