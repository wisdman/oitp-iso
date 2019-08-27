-- DROP TABLE private.crontab CASCADE;
CREATE TABLE private.crontab (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "proname" name NOT NULL,
  "moment"  varchar(13) NOT NULL,

  CONSTRAINT private__crontab__pkey PRIMARY KEY ("id"),
  CONSTRAINT private__crontab__check__proname CHECK (public.is_cron_function("proname")),
  CONSTRAINT private__crontab__check__moment CHECK (public.check_crontab_moment("moment"))
);

CREATE INDEX private__crontab__idx__enabled ON private.crontab USING btree ("enabled");
