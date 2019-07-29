SET search_path = "$user";

CREATE TYPE public.transactions__status AS ENUM (
  'new', -- Платёж создан
  'canceled', -- Платёж отменен

  'processing', -- Платеж в обработке
  'authorized', -- Средства заблокированы, но не списаны
  'confirmed', -- Денежные средства успешно списаны

  'refund', -- Запрос на возврат средств
  'refunding', -- Возврат в обработке
  'refunded', -- Произведен возврат денежных средств

  'error' -- Ошибка проведения операции
);

CREATE TABLE private.transactions (
  "id"     uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner"  uuid NOT NULL,

  "status" public.transactions__status NOT NULL,

  "tariff" uuid NOT NULL,
  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL,

  "lastUpdate" timestamp without time zone NOT NULL,

  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- System fingerprinting
  "ip" inet NOT NULL, -- IPv4 or IPv6 user address

  "acquiring" jsonb NOT NULL DEFAULT '[]'::jsonb, -- Операции банковского эквайдинга

  CONSTRAINT transactions__idx__pkey PRIMARY KEY ("id"),

  CONSTRAINT transactions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'fingerprint'),
  CONSTRAINT transactions__check__acquiring CHECK (jsonb_typeof("acquiring") = 'acquiring'),

  CONSTRAINT transactions__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE NO ACTION,

  CONSTRAINT transactions__fkey__tariff
    FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE OR REPLACE FUNCTION private.transactions__lastUpdate() RETURNS trigger AS $$
BEGIN
  NEW."lastUpdate" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER transactions__updateTS__trigger
  BEFORE INSERT OR UPDATE ON private.transactions FOR EACH ROW
  EXECUTE PROCEDURE private.transactions__lastUpdate();

CREATE OR REPLACE FUNCTION private.transactions__tariff() RETURNS trigger AS $$
DECLARE
  tariffAmount numeric(10);
  tariffInterval interval;
BEGIN
  SELECT t."amount", t."interval" INTO tariffAmount, tariffInterval FROM private.tariffs t WHERE t."id" = NEW."tariff";
  NEW."amount" = tariffAmount;
  NEW."interval" = tariffInterval;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER transactions__tariff__trigger
  BEFORE INSERT ON private.transactions FOR EACH ROW
  EXECUTE PROCEDURE private.transactions__tariff();
