-- DROP TABLE private.trash CASCADE;
CREATE TABLE private.trash (
  "deleted" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now())
);

