import { supabase } from "@/components/lib/supabaseClient";
import { store } from "@/store/store";


export const getAccountSize = async() => {
  const username = store.getUsername()
  const { data, error } = await supabase.storage.from('linky').list(username);

  if (error) {
    console.error('Error fetching files for account size:', error);
  }

  let totalSize = 0;
  if (data) {
    data.forEach(file => {
      totalSize += file.metadata.size;
    });
  }

  const totalSizeInMB = totalSize / (1024 * 1024);
  const mb = totalSizeInMB.toFixed(2);

  const totalSizeInGB = totalSize / (1024 * 1024 * 1024);
  const gb = totalSizeInGB.toFixed(2);

  return { mb, gb };
}