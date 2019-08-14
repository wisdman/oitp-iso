-- DROP TABLE private.msg_email CASCADE;
CREATE TABLE private.msg_email (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,

  "to" varchar(256) NOT NULL,
  "toName" varchar(128) NOT NULL DEFAULT '',

  "template" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg_email__pkey PRIMARY KEY ("id"),

  CONSTRAINT msg_email__check__id CHECK (NOT starts_with("id"::text, 'email-')),
  CONSTRAINT msg_email__check__to CHECK (public.check_email("to")),
  CONSTRAINT msg_email__check__data CHECK (jsonb_typeof("data") = 'object'),

  CONSTRAINT msg_email__fkey__template FOREIGN KEY ("template", "version")
    REFERENCES private.msg_templates("id", "version")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX msg_email__idx__status ON private.msg_email USING btree ("status");
