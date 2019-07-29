SET search_path = "$user";

CREATE TABLE private.trainer__relax__data (
  "id" integer NOT NULL,
  "data" text NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,
  "deleted" timestamp without time zone DEFAULT NULL,

  CONSTRAINT trainer__relax__data__idx__pkey PRIMARY KEY ("id"),
  CONSTRAINT trainer__relax__data__check__data CHECK (char_length("data") >= 0)
);

CREATE SEQUENCE private.trainer__relax__data__id__seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1
OWNED BY private.trainer__relax__data.id;

ALTER TABLE ONLY private.trainer__relax__data ALTER COLUMN id
SET DEFAULT nextval('private.trainer__relax__data__id__seq'::regclass);

CREATE OR REPLACE FUNCTION private.trainer__relax__config(_quantity int) RETURNS SETOF RECORD AS $$
DECLARE
  _previewTimeLimit smallint := 10;
BEGIN
  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', 'relax',
        'ui', 'relax',
        'previewTimeLimit', _previewTimeLimit,
        'image', t1."image",
        'data', t2."data"
      )
    FROM (
      SELECT
        ROW_NUMBER() OVER () AS "id",
        "id" AS "image"
      FROM private.relax_get(_quantity) AS t(id int)
    ) AS t1, (
      SELECT
        ROW_NUMBER() OVER (ORDER BY random()) AS "id",
        "data"
      FROM private.trainer__relax__data
      WHERE "id" <= _quantity
    ) AS t2
    WHERE t1."id" = t2."id"
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
