-- DROP TABLE msg.push CASCADE;
CREATE TABLE msg.push (
  "id" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
  "status" public.msg_message_status NOT NULL DEFAULT 'new'::public.msg_message_status,
  "ts" timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),

  "to" uuid NOT NULL,

  "template" public.msg_template_id NOT NULL,
  "version" smallint NOT NULL,

  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT msg__push__pkey PRIMARY KEY ("id"),

  -- CONSTRAINT msg__push__check__to CHECK ( ),
  CONSTRAINT msg__push__check__data CHECK (jsonb_typeof("data") = 'object'),

  CONSTRAINT msg__push__fkey__template FOREIGN KEY ("template", "version")
    REFERENCES private.msg_templates("id", "version")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX msg__push__idx__status ON msg.push USING btree ("status");
