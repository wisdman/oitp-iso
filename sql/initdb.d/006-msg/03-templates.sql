-- DROP TABLE private.msg_templates CASCADE;
CREATE TABLE private.msg_templates (
  "id" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  "subject" text NOT NULL,
  "body" text NOT NULL,

  CONSTRAINT private__msg_templates__pkey PRIMARY KEY ("id", "version"),
  CONSTRAINT private__msg_templates__check__version CHECK ("version" >= 0),
  CONSTRAINT private__msg_templates__check__subject CHECK (char_length("subject") > 0),
  CONSTRAINT private__msg_templates__check__body CHECK (char_length("body") > 0)
);

CREATE INDEX private__msg_templates__idx__enabled ON private.msg_templates USING btree ("enabled");

CREATE OR REPLACE FUNCTION private.msg_templates__trigger__prevent_delete_last_template_of_id() RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM unnest(enum_range(null::public.msg_template_id)) AS t1("id")
    LEFT JOIN private.msg_templates AS t2 ON (t1."id" = t2."id" AND t2."enabled")
    WHERE t2."id" IS NULL
  ) THEN
    RAISE integrity_constraint_violation USING MESSAGE = 'Delete or disable last template of "' || OLD."id" || '"';
  END IF;
  RETURN OLD;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER prevent_delete_last_template_of_id AFTER UPDATE OR DELETE ON private.msg_templates FOR EACH ROW
  EXECUTE PROCEDURE private.msg_templates__trigger__prevent_delete_last_template_of_id();
