-- DROP TABLE private.config CASCADE;
CREATE TABLE private.config (
  "key"         varchar(64) NOT NULL,
  "value"       jsonb       NOT NULL DEFAULT 'null'::jsonb,
  "description" text        NOT NULL DEFAULT '',

  CONSTRAINT private__config__pkey PRIMARY KEY ("key"),
  CONSTRAINT private__config__check__key CHECK (public.check_config_key("key"))
);
