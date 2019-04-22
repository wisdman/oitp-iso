SET search_path = "$user";

CREATE TABLE private.files (
  "id"          oid          NOT NULL,
  "enabled"     boolean      NOT NULL DEFAULT TRUE,
  "deleted"     boolean      NOT NULL DEFAULT FALSE,
  "mime"        text         NOT NULL DEFAULT 'application/octet-stream',
  "title"       varchar(64)  NOT NULL DEFAULT '',
  "description" varchar(128) NOT NULL DEFAULT '',

  CONSTRAINT files__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);