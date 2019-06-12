SET search_path = "$user";

CREATE TABLE private.invites (
  "id"    char(128) NOT NULL,
  "owner" uuid      NOT NULL,

  "email" varchar(256) NOT NULL,
  "accepted" bool NOT NULL DEFAULT FALSE,

  "tariff" uuid DEFAULT NULL,

  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
  "expires" timestamp without time zone NOT NULL,

  CONSTRAINT invites__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT invites__check__id CHECK ("id" ~ '^[0-9a-f]{128}$'),

  CONSTRAINT invites__check__email CHECK ("email" ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),

  CONSTRAINT invites__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE NO ACTION,

  CONSTRAINT invites__fkey__tariff
    FOREIGN KEY ("tariff")
    REFERENCES private.tariffs("id")
    ON UPDATE CASCADE ON DELETE NO ACTION
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.invites__unique_id() RETURNS trigger AS $$
BEGIN
  NEW."id" = public.unique_id();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER invites__unique_id__trigger
  BEFORE INSERT ON private.invites FOR EACH ROW
  EXECUTE PROCEDURE private.invites__unique_id();

CREATE OR REPLACE FUNCTION private.invites__expires() RETURNS trigger AS $$
DECLARE invitesInterval interval;
BEGIN
  SELECT c."value"::text::interval INTO invitesInterval FROM private.config c WHERE c."key" = 'invitesInterval';
  NEW."expires" = timezone('UTC', now() + invitesInterval);
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER invites__expires__trigger
  BEFORE INSERT OR UPDATE ON private.invites FOR EACH ROW
  EXECUTE PROCEDURE private.invites__expires();

CREATE OR REPLACE FUNCTION private.invites__prune() RETURNS void AS $$
  DELETE FROM private.invites WHERE "expires" < timezone('UTC', now());
$$ LANGUAGE SQL;
