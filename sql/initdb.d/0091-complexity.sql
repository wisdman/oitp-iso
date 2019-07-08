SET search_path = "$user";

CREATE TABLE private.complexity_defaults (
  "trainer" public.trainer__type NOT NULL,
  "complexity" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT complexity_defaults__idx__pkey PRIMARY KEY ("trainer"),
  CONSTRAINT complexity_defaults__check__complexity CHECK (jsonb_typeof("complexity") = 'object')
) WITH (OIDS = FALSE);


CREATE TABLE private.complexity (
  "owner" uuid NOT NULL,
  "trainer" public.trainer__type NOT NULL,

  "ts" timestamp without time zone NOT NULL,
  "complexity" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT complexity__idx__pkey PRIMARY KEY ("owner", "trainer"),

  CONSTRAINT complexity__check__complexity CHECK (jsonb_typeof("complexity") = 'object'),

  CONSTRAINT complexity__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);

CREATE OR REPLACE FUNCTION private.complexity__update_ts() RETURNS trigger AS $$
BEGIN
  NEW."ts" = timezone('UTC', now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER complexity__update_ts__trigger
  BEFORE INSERT OR UPDATE ON private.complexity FOR EACH ROW
  EXECUTE PROCEDURE private.complexity__update_ts();


CREATE VIEW public.self_complexity AS
  SELECT
    d."trainer",
    d."complexity" || coalesce(c."complexity", '{}'::jsonb) AS "complexity"
  FROM
    private.complexity_defaults AS d
  LEFT JOIN
    private.complexity AS c ON (
      c."trainer" = d."trainer"
      AND
      c."owner" = current_setting('app.sessionUser')::uuid
    );

GRANT SELECT ON public.self_complexity TO "api-public";
