create table
  public.link (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null default auth.uid (),
    linkname text null,
    linkdescription text null,
    category text null,
    link text null ,
    linkusername text null,
    linkpassword text null,
    contactname text null,
    contactphonenumber text null,
    contactemail text null,
    linknotes text null,
  ) tablespace pg_default;