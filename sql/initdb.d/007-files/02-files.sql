-- DROP TABLE private.files CASCADE;
CREATE TABLE private.files (
  "id" uuid NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "public" boolean NOT NULL DEFAULT FALSE,

  "mime" text NOT NULL DEFAULT 'application/octet-stream',

  "name" varchar(64) NOT NULL DEFAULT '',
  "alt"  text        NOT NULL DEFAULT '',

  CONSTRAINT private__files__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__files__check__mime CHECK (public.check_mime("mime")),
  CONSTRAINT private__files__check__name CHECK (char_length("name") > 0)
);

SELECT private.init_trash_scope('private.files');

CREATE INDEX private__files__idx__enabled_public ON private.files USING btree ("enabled", "public");
