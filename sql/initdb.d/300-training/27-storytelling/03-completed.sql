-- DROP TABLE trainer.storytelling_users_completed CASCADE;
CREATE TABLE trainer.storytelling_users_completed (
  "id" int NOT NULL,
  "owner" uuid NOT NULL,

  CONSTRAINT storytelling_users_completed__pkey PRIMARY KEY ("id", "owner"),

  CONSTRAINT storytelling_users_completed__fkey__id FOREIGN KEY ("id")
    REFERENCES trainer.storytelling_data("id")
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT storytelling_users_completed__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION trainer.is_storytelling_users_completed(_id int) RETURNS bool AS $$
  SELECT _id IN (SELECT "id" FROM trainer.storytelling_users_completed WHERE "owner" = current_setting('app.sessionUser', true)::uuid)
$$ LANGUAGE sql IMMUTABLE STRICT;
