SET search_path = "$user";

CREATE TABLE private.promo_codes (
  "code"    varchar(16) NOT NULL,
  "enabled" boolean NOT NULL DEFAULT TRUE,

  "deleted" timestamp without time zone DEFAULT NULL,

  "title"       varchar(64)  NOT NULL,
  "description" text         NOT NULL,

  "tariff" uuid NOT NULL,

  CONSTRAINT promo_codes__idx__pkey PRIMARY KEY ("code"),

  CONSTRAINT promo_codes__check__code CHECK ("code" ~ '^[A-Z]{5,}$'),

  CONSTRAINT promo_codes__fkey__tariff
    FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);
