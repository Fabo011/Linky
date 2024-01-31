create table
  public.link (
    username text not null,
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    linkname text not null,
    linkdescription text null,
    category text not null,
    id uuid not null default gen_random_uuid (),
    link text null default ''::text,
    "chatRoom" text null default ''::text,
    "chatKey" text null,
    iv text null,
    user_id uuid null default auth.uid (),
    email text not null,
    linkusername text null default ''::text,
    linkpassword text null default ''::text,
    type text null,
    constraint link_pkey primary key (id)
  ) tablespace pg_default;