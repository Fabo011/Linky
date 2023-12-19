-- This function deletes all messages when user deletes the corresponding chat room in links.
create or replace function deletechatmessages() returns trigger as $$

begin
  delete from chat where "chatRoom" = old."chatRoom";
  return old;
end;

$$
language plpgsql;