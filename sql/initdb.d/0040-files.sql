SET search_path = "$user";

-- DROP TABLE private.files CASCADE;
CREATE TABLE private.files (
  "id" uuid NOT NULL,

  "deleted" timestamp without time zone DEFAULT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "public" boolean NOT NULL DEFAULT FALSE,

  "mime" text NOT NULL DEFAULT 'application/octet-stream',

  "name" varchar(64) NOT NULL DEFAULT '',
  "alt"  text        NOT NULL DEFAULT '',

  CONSTRAINT files__pkey PRIMARY KEY ("id"),

  CONSTRAINT files__check__mime CHECK (public.check_mime("mime")),
  CONSTRAINT files__check__name CHECK (char_length("name") > 0)
);

CREATE INDEX files__idx__deleted_enabled_public ON private.files USING btree ("deleted", "enabled", "public");
