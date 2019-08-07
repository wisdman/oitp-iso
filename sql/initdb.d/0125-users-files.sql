SET search_path = "$user";

-- DROP TABLE private.users_referals CASCADE;
CREATE TABLE private.users_files (
  "file" uuid NOT NULL,
  "owner" uuid NOT NULL,

  CONSTRAINT users_files__pkey PRIMARY KEY ("file", "owner"),

  CONSTRAINT users_files__fkey__file FOREIGN KEY ("file")
    REFERENCES private.files("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT users_files__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

