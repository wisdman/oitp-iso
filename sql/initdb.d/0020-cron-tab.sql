SET search_path = "$user";

CREATE OR REPLACE FUNCTION private.is_cron_function(_proname name) RETURNS boolean AS $$
  SELECT EXISTS(SELECT 1 FROM pg_proc WHERE proname = _proname AND pronamespace = 'cron'::regnamespace)
$$ LANGUAGE sql;

-- DROP TABLE private.cron_tab CASCADE;
CREATE TABLE private.cron_tab (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "proname" name NOT NULL,
  "moment"  time without time zone NOT NULL,

  CONSTRAINT cron_tab__pkey PRIMARY KEY ("id"),
  CONSTRAINT cron_tab__check__proname CHECK (private.is_cron_function("proname"))
);

CREATE INDEX cron_tab__idx__enabled ON private.cron_tab USING btree ("enabled");
