SET search_path = "$user";

CREATE TYPE public.trainers_data_patterns__type AS ENUM (
  'images', -- Для изображений
  'numbers' -- Для чисел
);

CREATE TABLE private.trainers_data_patterns (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "type" public.trainers_data_patterns__type NOT NULL,
  "data"    smallint[] NOT NULL,

  CONSTRAINT trainers_data_patterns__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
