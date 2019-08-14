-- DROP TABLE private.crontab CASCADE;
CREATE TABLE private.crontab (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "proname" name NOT NULL,
  "moment"  time without time zone NOT NULL,

  CONSTRAINT crontab__pkey PRIMARY KEY ("id"),
  CONSTRAINT crontab__check__proname CHECK (private.is_cron_function("proname"))
);

CREATE INDEX crontab__idx__enabled ON private.crontab USING btree ("enabled");
