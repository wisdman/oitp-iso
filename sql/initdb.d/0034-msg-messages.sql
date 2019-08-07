SET search_path = "$user";

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


-- DROP TABLE private.msg_sms CASCADE;
CREATE TABLE private.msg_sms (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,

  "to" varchar(15) NOT NULL,

  "template" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg_sms__pkey PRIMARY KEY ("id"),

  CONSTRAINT msg_sms__check__id CHECK (NOT starts_with("id"::text, 'sms-')),
  CONSTRAINT msg_sms__check__to CHECK (public.check_phone("to")),
  CONSTRAINT msg_sms__check__data CHECK (jsonb_typeof("data") = 'object'),

  CONSTRAINT msg_sms__fkey__template FOREIGN KEY ("template", "version")
    REFERENCES private.msg_templates("id", "version")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX msg_sms__idx__status ON private.msg_sms USING btree ("status");


-- DROP TABLE private.msg_push CASCADE;
CREATE TABLE private.msg_push (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,

  "to" uuid NOT NULL,

  "template" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg_push__pkey PRIMARY KEY ("id"),

  CONSTRAINT msg_sms__check__id CHECK (NOT starts_with("id"::text, 'push-')),
  -- CONSTRAINT msg_push__check__to CHECK ( ),
  CONSTRAINT msg_push__check__data CHECK (jsonb_typeof("data") = 'object'),

  CONSTRAINT msg_push__fkey__template FOREIGN KEY ("template", "version")
    REFERENCES private.msg_templates("id", "version")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX msg_push__idx__status ON private.msg_push USING btree ("status");
