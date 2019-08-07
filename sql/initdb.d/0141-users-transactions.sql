SET search_path = "$user";

-- DROP TABLE private.transactions CASCADE;
CREATE TABLE private.transactions (
  "id"     uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner"  uuid NOT NULL,

  "status" public.transaction_status NOT NULL,

  "tariff" uuid NOT NULL,
  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL,

  "lastUpdate" timestamp without time zone NOT NULL,

  "ip" inet NOT NULL, -- IPv4 or IPv6 user address
  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof("fingerprint") = 'object'), -- System fingerprinting

  "acquiring" jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof("acquiring") = 'array'), -- Операции банковского эквайдинга

  CONSTRAINT transactions__pkey PRIMARY KEY ("id"),

  CONSTRAINT transactions__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT transactions__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

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
  SELECT "amount", "interval"
  INTO STRICT _tariffAmount, _tariffInterval
  FROM private.tariffs
  WHERE "id" = NEW."tariff";
  NEW."amount" = _tariffAmount;
  NEW."interval" = _tariffInterval;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER amount_and_interval_from_tariff BEFORE INSERT ON private.transactions FOR EACH ROW
  EXECUTE PROCEDURE private.transactions__trigger__amount_and_interval_from_tariff();
