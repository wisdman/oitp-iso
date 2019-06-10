SET search_path = "$user";

CREATE TABLE private.sms (
  "id"    smallint NOT NULL,
  "owner" uuid     NOT NULL,

  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT sms__idx__pkey PRIMARY KEY ("id", "owner"),
  CONSTRAINT sms__check__id CHECK ("id" >= 1000 AND "id" <= 9999),

  CONSTRAINT sms__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.sms__unique_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = public.random_in_range(1000, 9999);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sms__unique_id__trigger
  BEFORE INSERT ON private.sms FOR EACH ROW
  EXECUTE PROCEDURE private.sms__unique_id();

CREATE OR REPLACE FUNCTION private.sms__expires() RETURNS trigger AS $$
DECLARE smsInterval interval;
BEGIN
  SELECT c."value"::text::interval INTO smsInterval FROM private.config c WHERE c."key" = 'smsInterval';
  NEW."expires" = timezone('UTC', now() + smsInterval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER sms__expires__trigger
  BEFORE INSERT OR UPDATE ON private.sms FOR EACH ROW
  EXECUTE PROCEDURE private.sms__expires();

CREATE OR REPLACE FUNCTION private.users__dropSMS() RETURNS trigger AS $$
BEGIN
  IF (NEW."deleted" OR NOT NEW."enabled") THEN
    DELETE FROM private.sms s WHERE s."owner" = NEW."id";
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER users__dropSMS__trigger
  AFTER UPDATE ON private.users FOR EACH ROW
  EXECUTE PROCEDURE private.users__dropSMS();

CREATE OR REPLACE FUNCTION private.sms__prune() RETURNS void AS $$
  DELETE FROM private.sms WHERE "expires" < timezone('UTC', now());
$$ LANGUAGE SQL;
