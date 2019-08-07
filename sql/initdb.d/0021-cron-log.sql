SET search_path = "$user";

-- DROP TABLE private.cron_log CASCADE;
CREATE TABLE private.cron_log (
  "id" uuid DEFAULT NULL,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "proname" name    NOT NULL,
  "result"  boolean NOT NULL,
  "detail"  jsonb   NOT NULL,

  CONSTRAINT cron_log__pkey PRIMARY KEY ("id", "ts"),
  CONSTRAINT cron_log__fkey__id FOREIGN KEY ("id")
    REFERENCES private.cron_tab("id")
    ON UPDATE CASCADE ON DELETE SET NULL
);
