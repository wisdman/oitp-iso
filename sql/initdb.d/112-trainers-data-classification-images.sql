SET search_path = "$user";

CREATE TABLE private.trainers_data_classification_images (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1(),
  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" boolean NOT NULL DEFAULT FALSE,

  "title"   text    NOT NULL,
  "image"   oid     NOT NULL,

  CONSTRAINT trainers_data_classification_images__idx__pkey PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

