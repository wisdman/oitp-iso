-- DROP TABLE payment.transactions CASCADE;
CREATE TABLE payment.transactions (
  "id" bigint NOT NULL,
  "owner" uuid NOT NULL,

  "status" public.transaction_status NOT NULL,

  "tariff" uuid NOT NULL,
  "amount" numeric(10) NOT NULL,
  "interval" interval NOT NULL,

  "ts" timestamp without time zone NOT NULL,

  "fingerprint" jsonb NOT NULL DEFAULT '{}'::jsonb, -- Fingerprinting
  "acquiring"   jsonb NOT NULL DEFAULT '[]'::jsonb, -- Операции банковского эквайдинга

  CONSTRAINT payment__transactions__pkey PRIMARY KEY ("id"),

  CONSTRAINT payment__transactions__check__fingerprint CHECK (jsonb_typeof("fingerprint") = 'object'),
  CONSTRAINT payment__transactions__check__acquiring CHECK (jsonb_typeof("acquiring") = 'array'),

  CONSTRAINT payment__transactions__fkey__owner FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT payment__transactions__fkey__tariff FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

SELECT private.init_trash_scope('payment.transactions');

-- DROP SEQUENCE payment.transactions_id CASCADE;
CREATE SEQUENCE payment.transactions_id AS bigint
  START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
  OWNED BY payment.transactions.id;

ALTER TABLE ONLY payment.transactions
  ALTER COLUMN id SET DEFAULT nextval('payment.transactions_id'::regclass);

CREATE INDEX payment__transactions__idx__status ON payment.transactions USING btree ("status");
CREATE INDEX payment__transactions__idx__ts ON payment.transactions USING btree ("ts");

CREATE OR REPLACE FUNCTION payment.transactions__trigger__last_update() RETURNS trigger AS $$
BEGIN
  NEW."ts" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER last_update BEFORE INSERT OR UPDATE ON payment.transactions FOR EACH ROW
  EXECUTE PROCEDURE payment.transactions__trigger__last_update();

CREATE OR REPLACE FUNCTION payment.transactions__trigger__amount_and_interval_from_tariff() RETURNS trigger AS $$
DECLARE
  _tariffAmount numeric(10);
  _tariffInterval interval;
BEGIN
  SELECT "amount", "interval" INTO STRICT NEW."amount", NEW."interval"
  FROM private.tariffs WHERE "id" = NEW."tariff";
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER amount_and_interval_from_tariff BEFORE INSERT ON payment.transactions FOR EACH ROW
  EXECUTE PROCEDURE payment.transactions__trigger__amount_and_interval_from_tariff();
