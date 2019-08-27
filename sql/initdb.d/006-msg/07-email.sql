-- DROP TABLE msg.email CASCADE;
CREATE TABLE msg.email (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "to" varchar(256) NOT NULL,
  "toName" varchar(128) NOT NULL DEFAULT '',

  "template" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg__email__pkey PRIMARY KEY ("id"),

  CONSTRAINT msg__email__check__to CHECK (public.check_email("to")),
  CONSTRAINT msg__email__check__data CHECK (jsonb_typeof("data") = 'object'),

  CONSTRAINT msg__email__fkey__template FOREIGN KEY ("template", "version")
    REFERENCES private.msg_templates("id", "version")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX msg__email__idx__status ON msg.email USING btree ("status");
