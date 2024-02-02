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

export const checkStorageLimit = async (): Promise<boolean> => {
const { data } = await supabase.auth.getUser();
const account = data.user?.user_metadata.tariff as string | undefined;

const { mb, gb } = await getAccountSize();
if (account === 'bronze' && gb < '200') {
return true;
} else if (account === 'silver' && gb < '500') {
return true;
} else if (account === 'gold' && gb < '1000') {
return true;
} else {
return false;
}
}

export const tariffCheck = async () => {
  const account = sessionStorage.getItem('tariff');
  if (account === 'free') {
    return '0';
  } else if (account === 'bronze') {
    return '200';
  } else if (account === 'silver') {
    return '500';
  } else if (account === 'gold') {
    return '1000';
  }
 }