create table
  public.chat (
    "chatRoom" character varying not null,
    username character varying null,
    message character varying null,
    id uuid not null default gen_random_uuid (),
    iv text null,
    user_id uuid null default auth.uid (),
    constraint chat_pkey primary key (id)
  ) tablespace pg_default;