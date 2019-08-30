-- DROP TABLE msg.sms CASCADE;
CREATE TABLE msg.sms (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "to" varchar(15) NOT NULL,

  "template" public.msg_template_id NOT NULL,
  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg__sms__pkey PRIMARY KEY ("id"),

  CONSTRAINT msg__sms__check__to CHECK (public.check_phone("to")),
  CONSTRAINT msg__sms__check__data CHECK (jsonb_typeof("data") = 'object')
);

CREATE INDEX msg__sms__idx__status ON msg.sms USING btree ("status");

GRANT SELECT ON TABLE msg.sms TO "daemon-msg";
GRANT UPDATE ON TABLE msg.sms TO "daemon-msg";
