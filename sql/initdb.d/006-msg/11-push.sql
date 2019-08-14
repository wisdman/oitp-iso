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
