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
 
export const checkPaymentNumber = async (number: string) => {
  const username = store.getUsername()
  const { data, error }: any = await supabase.from('paymentnumber').select('number');
  
  if (error) { 
    console.error('paymentnumber error: ' + error);
    return false;
  }
  
  const setData = {
    username: username,
    number: number,
  }

  try {
    if (data[0].number === number || data[1].number === number || data[2].number === number) {
    const { error } = await supabase.from('paymentused').insert(setData);
    if (error) return false;  
    // #TODO If error send email to us  
    return true;
  } else {
    console.error('Number not equal');
    return false;
  }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const upgradeUser = async (number: string) => {
  let tariff = ''
  const { data } = await supabase.auth.getUser();

  if (number.startsWith('Bronze-')) {
    tariff = 'bronze';
  } else if (number.startsWith('Silver-')) {
    tariff = 'silver';
  } else if (number.startsWith('Golden-')) {
    tariff = 'gold';
  }
           
  if (data) {
    const { error } = await supabase.auth.updateUser({
      data: { ...(data as any).user_metadata, tariff: tariff }
    })

    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  }
}
