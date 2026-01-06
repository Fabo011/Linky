alter policy "Enable delete for users based on user_id"
on "public"."link"
to public
using (
  (auth.uid() = user_id)
);

alter policy "Enable delete for authenticated users only"
on "public"."link"
to authenticated
with check (
  true
);

alter policy "Enable insert for users based on user_id"
on "public"."link"
to public
using (
  (auth.uid() = user_id)
);

alter policy "Enable insert for authenticated users only"
on "public"."link"
to authenticated
with check (
  true
);

alter policy "Enable select for users based on user_id"
on "public"."link"
to public
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

alter policy "Enable select for authenticated users only"
on "public"."link"
to authenticated
with check (
  true
);

alter policy "Enable update for users based on user_id"
on "public"."link"
to public
using (
  (auth.uid() = user_id)
);

alter policy "Enable update for authenticated users only"
on "public"."link"
to authenticated
with check (
  true
);

create policy "Enable users to view their own data only"
on "public"."link"
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = user_id
);