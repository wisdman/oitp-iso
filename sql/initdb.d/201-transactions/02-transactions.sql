-- DROP TABLE private.transactions CASCADE;
CREATE TABLE private.transactions (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner" uuid NOT NULL,

  "status" public.transaction_status NOT NULL,

  "tariff" uuid NOT NULL,
  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL,

  "lastUpdate" timestamp without time zone NOT NULL,

  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting

  "acquiring" jsonb NOT NULL DEFAULT '[]'::jsonb, -- Операции банковского эквайдинга

  CONSTRAINT private__transactions__pkey PRIMARY KEY ("id"),

  CONSTRAINT private__transactions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'object'),
  CONSTRAINT private__transactions__check__acquiring CHECK (jsonb_typeof("acquiring") = 'array'),

  CONSTRAINT private__transactions__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT private__transactions__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

SELECT private.init_trash_scope('private.transactions');

CREATE INDEX private__transactions__idx__status ON private.transactions USING btree ("status");
CREATE INDEX private__transactions__idx__lastUpdate ON private.transactions USING btree ("lastUpdate");

CREATE OR REPLACE FUNCTION private.transactions__trigger__last_update() RETURNS trigger AS $$
BEGIN
  NEW."lastUpdate" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER last_update BEFORE INSERT OR UPDATE ON private.transactions FOR EACH ROW
  EXECUTE PROCEDURE private.transactions__trigger__last_update();

CREATE OR REPLACE FUNCTION private.transactions__trigger__amount_and_interval_from_tariff() RETURNS trigger AS $$
DECLARE
  _tariffAmount numeric(10);
  _tariffInterval interval;
BEGIN
  SELECT "amount", "interval" INTO STRICT NEW."amount", NEW."interval"
  FROM private.tariffs WHERE "id" = NEW."tariff";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER amount_and_interval_from_tariff BEFORE INSERT ON private.transactions FOR EACH ROW
  EXECUTE PROCEDURE private.transactions__trigger__amount_and_interval_from_tariff();
