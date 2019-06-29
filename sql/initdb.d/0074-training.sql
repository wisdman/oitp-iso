SET search_path = "$user";

CREATE TYPE public.training__type AS ENUM (
  'everyday', -- Ежедневная
  'once'      -- Разовая
);

CREATE TABLE private.training (
  "id"    uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "owner" uuid NOT NULL,

  "deleted" timestamp without time zone DEFAULT NULL,

  "type"      public.training__type NOT NULL,
  "timeLimit" integer NOT NULL,
  "trainers"  jsonb NOT NULL DEFAULT '[]'::jsonb,

  "start" timestamp without time zone NOT NULL DEFAULt timezone('UTC', now()),
  "finish"  timestamp without time zone DEFAULT NULL,

  "results" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "totals" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT training__idx__pkey PRIMARY KEY ("id", "owner"),

  CONSTRAINT training__check__trainers CHECK (jsonb_typeof("trainers") = 'array'),
  CONSTRAINT training__check__results CHECK (jsonb_typeof("results") = 'array'),
  CONSTRAINT training__check__totals CHECK (jsonb_typeof("totals") = 'object'),

  CONSTRAINT training__fkey__owner
    FOREIGN KEY ("owner")
    REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);


CREATE VIEW public.training AS
  SELECT
    t."id",
    t."owner",

    t."type",
    t."timeLimit",
    t."trainers",

    t."start",
    t."finish",

    t."results",
    t."totals"
  FROM
    private.training AS t
  WHERE
    t."deleted" IS NULL;

GRANT SELECT ON public.training TO "api-public";


CREATE VIEW public.self_training AS
  SELECT
    t."id",
    t."owner",

    t."type",
    t."timeLimit",
    t."trainers",

    t."start",
    t."finish",

    t."results",
    t."totals"
  FROM
    private.training AS t
  WHERE
    t."deleted" IS NULL
    AND
    t."owner" = current_setting('app.sessionUser')::uuid;

GRANT SELECT ON public.self_training TO "api-public";

CREATE OR REPLACE FUNCTION public.self_training__new()
RETURNS trigger
AS $$
BEGIN
  INSERT INTO private.training (
    "owner",
    "type",
    "timeLimit",
    "trainers"
  ) VALUES (
    current_setting('app.sessionUser')::uuid,
    NEW."type",
    NEW."timeLimit",
    NEW."trainers"
  ) RETURNING
    "id" INTO NEW."id";

  RETURN NEW;
END
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
CREATE TRIGGER self_training__new__trigger
  INSTEAD OF INSERT ON public.self_training FOR EACH ROW
  EXECUTE PROCEDURE public.self_training__new();

GRANT INSERT ON public.self_training TO "api-public";

CREATE OR REPLACE FUNCTION public.self_training__update()
RETURNS trigger
AS $$
BEGIN
  UPDATE private.training SET
    "results" = NEW."results",
    "finish" = NEW."finish",
    "totals" = NEW."totals"
  WHERE
    "id" = NEW."id"
    AND
    "owner" = current_setting('app.sessionUser')::uuid;

  RETURN NEW;
END
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
CREATE TRIGGER self_training__update__trigger
  INSTEAD OF UPDATE ON public.self_training FOR EACH ROW
  EXECUTE PROCEDURE public.self_training__update();

GRANT UPDATE ON public.self_training TO "api-public";


CREATE VIEW public.training_results AS
  SELECT
    r."id",
    r."result",
    r."config"
  FROM (
    SELECT
      t."id",
      jsonb_array_elements(t."results") AS "result",
      jsonb_array_elements(t."trainers") AS "config"
    FROM
      public.training AS t
  ) AS r
  WHERE
    "result"->>'uuid' = "config"->>'uuid';

GRANT SELECT ON public.training_results TO "api-public";

CREATE VIEW public.self_training_results AS
  SELECT
    r."id",
    r."owner",
    r."result",
    r."config"
  FROM (
    SELECT
      t."id",
      t."owner",
      jsonb_array_elements(t."results") AS "result",
      jsonb_array_elements(t."trainers") AS "config"
    FROM
      public.self_training AS t
  ) AS r
  WHERE
    "result"->>'uuid' = "config"->>'uuid';

GRANT SELECT ON public.self_training_results TO "api-public";
