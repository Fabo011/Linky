CREATE TABLE public.link (
  linkname text NOT NULL,
  linkdescription text,
  category text NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  link text DEFAULT ''::text,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  linkusername text DEFAULT ''::text,
  linkpassword text DEFAULT ''::text,
  contactname text,
  contactphonenumber text,
  contactemail text,
  notes text,
  filename text,
  CONSTRAINT link_pkey PRIMARY KEY (id)
);