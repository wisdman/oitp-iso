SET search_path = "$user";

CREATE TABLE private.tariffs (
  "id"      uuid    NOT NULL DEFAULT uuid_generate_v1mc(),
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "title"       varchar(64)  NOT NULL,
  "description" text         NOT NULL DEFAULT '',

  "private" boolean NOT NULL DEFAULT FALSE,
  "default" boolean NOT NULL DEFAULT FALSE,

  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL DEFAULT '1 mon'::interval,

  CONSTRAINT tariffs__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT tariffs__check__title CHECK (char_length("title") > 0),

  CONSTRAINT tariffs__check__amount CHECK ("amount" > 0 OR ("amount" = 0 AND NOT "default"))
);

CREATE UNIQUE INDEX tariffs__idx__unique_default ON private.tariffs USING btree ("default") WHERE "default" = TRUE;

CREATE OR REPLACE FUNCTION public.default_tariff() RETURNS uuid AS $$
  SELECT "id" FROM private.tariffs WHERE "default" LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;