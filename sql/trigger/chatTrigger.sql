-- Triggers delete all messages function 
create trigger deletechatmessagesontrigger before delete on link

for each row
execute function deletechatmessages();