SET search_path = "$user";

-- DROP TABLE trainer.text_reading_users_completed CASCADE;
CREATE TABLE trainer.text_reading_users_completed (
  "id" int NOT NULL,
  "owner" uuid NOT NULL,

  CONSTRAINT text_reading_users_completed__pkey PRIMARY KEY ("id", "owner"),

  CONSTRAINT text_reading_users_completed__fkey__id FOREIGN KEY ("id")
    REFERENCES trainer.text_reading_data("id")
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT text_reading_users_completed__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION trainer.is_text_reading_users_completed(_id int) RETURNS bool AS $$
  SELECT _id IN (SELECT "id" FROM trainer.text_reading_users_completed WHERE "owner" = current_setting('app.sessionUser', true)::uuid)
$$ LANGUAGE sql IMMUTABLE STRICT;
