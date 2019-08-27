-- DROP TABLE public.trainers_by_groups CASCADE;
CREATE TABLE public.trainers_by_groups (
  "trainer" public.trainer_type NOT NULL,
  "group" public.trainer_group NOT NULL,

  "enabled" boolean NOT NULL DEFAULT TRUE,

  CONSTRAINT public__trainers_by_groups__pkey PRIMARY KEY ("trainer", "group")
);

CREATE INDEX public__trainers_by_groups__idx__enabled ON public.trainers_by_groups USING btree ("enabled");
