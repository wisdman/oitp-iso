SET search_path = "$user";

CREATE TABLE private.complexity (
  "owner" uuid NOT NULL,
  "trainer" public.trainer__type NOT NULL,

  "ts" timestamp without time zone NOT NULL,

  "previewTimeLimit" smallint NOT NULL DEFAULT 0,
  "timeLimit"        smallint NOT NULL DEFAULT 0,
  "complexity"       smallint NOT NULL DEFAULT 1,

  CONSTRAINT complexity__idx__pkey PRIMARY KEY ("owner", "trainer"),

  CONSTRAINT complexity__check__previewTimeLimit CHECK ("previewTimeLimit" >= 0),
  CONSTRAINT complexity__check__timeLimit CHECK ("timeLimit" >= 0),
  CONSTRAINT complexity__check__complexity CHECK ("complexity" > 0),

  CONSTRAINT complexity__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.complexity__ts() RETURNS trigger AS $$
BEGIN
  NEW."ts" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER complexity__ts__trigger
  BEFORE INSERT OR UPDATE ON private.complexity FOR EACH ROW
  EXECUTE PROCEDURE private.complexity__ts();

CREATE VIEW self.complexity AS
  SELECT
    d."trainer",
    coalesce(c."previewTimeLimit", d."previewTimeLimit") AS "previewTimeLimit",
    coalesce(c."timeLimit", d."timeLimit") AS "timeLimit",
    coalesce(c."complexity", d."complexity") AS "complexity"
  FROM private.complexity_defaults AS d
  LEFT JOIN private.complexity AS c ON (
    c."trainer" = d."trainer"
    AND
    c."owner" = current_setting('app.sessionUser')::uuid
  );

GRANT SELECT ON self.complexity TO "api-public";
