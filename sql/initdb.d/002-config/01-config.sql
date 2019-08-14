-- DROP TABLE private.config CASCADE;
CREATE TABLE private.config (
  "key"         varchar(64) NOT NULL,
  "secure"      boolean     NOT NULL DEFAULT FALSE,
  "value"       jsonb       NOT NULL DEFAULT 'null'::jsonb,
  "description" text        NOT NULL DEFAULT '',

  CONSTRAINT config__pkey PRIMARY KEY ("key"),
  CONSTRAINT config__check__key CHECK ("key" ~ '^[a-z][0-9a-zA-Z]+$')
);
