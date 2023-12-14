import { supabase } from "../lib/supabaseClient";
import { convertStringToHex } from "@/components/crypto/crypto";

const generateUsername = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }

  return username as string;
};

export const saveNewUser = async (
  email: string,
  publicKey: string,
) => {
  const tariff = 'defaultFree';
  const size = 0;
  const accountStatus = true; // true is free, false is blocked

  const usernamePre = generateUsername();
  const username = usernamePre;  
  const hexPublicKey = convertStringToHex(publicKey);
  const hexTariff = convertStringToHex(tariff);

  const { error } = await supabase.from('users').insert({
    email: email, // Generate foreign key in database  
    username: username,
    publicKey: hexPublicKey,
    tariff: hexTariff,
    size: size,
    accountStatus: accountStatus,
  });
  if (error) {
    console.trace(error);
    throw new Error('SaveNewUser failed.');
  }
};