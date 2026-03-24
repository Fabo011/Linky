/* Run this in Supabase SQL Editor (Developer Only)*/
create or replace function delete_user()
returns void language sql security definer as
$$ delete from auth.users where id = auth.uid(); $$;