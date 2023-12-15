import { supabase } from "../lib/supabaseClient";

export const getUser = async (
    email: string,
) => {
    const { data, error } = await supabase.from('users').select('*').eq(`email`, email);
      
    if (error) throw new Error('No user found.');
      
    if (data) {
        const user = data?.[0]

        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('pub', user.publicKey);
        sessionStorage.setItem('tariff', user.tariff);
        sessionStorage.setItem('accountSize', user.accountSize);
        sessionStorage.setItem('accountStatus', user.accountStatus);
    };
};