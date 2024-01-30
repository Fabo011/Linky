import { supabase } from "@/components/lib/supabaseClient";
import { store } from "@/store/store";

const username = store.getUsername()

export const getAccountSize = async() => {
   const { data, error } = await supabase.storage.from('linky').list(username);

  if (error) {
    console.error('Error fetching files for account size:', error);
    return null;
  }

  let totalSize = 0;
  if (data) {
    data.forEach(file => {
      totalSize += file.metadata.size;
    });
  }

  return totalSize;
}