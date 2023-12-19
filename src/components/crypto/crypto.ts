import * as forge from 'node-forge';

export const generateRandomKey = (): { key: string; iv: string } => {
  const key = forge.random.getBytesSync(16);
  const iv = forge.random.getBytesSync(16);
  return { key: forge.util.bytesToHex(key), iv: forge.util.bytesToHex(iv) };
};

export const encryptMessage = (input: string): string => {
   try {
    const iv = sessionStorage.getItem('iv') as string;
    const key = sessionStorage.getItem('chatKey') as string;
        
    const inputBytes = forge.util.createBuffer(input, 'utf-8' as forge.Encoding).getBytes();
    const cipher = forge.cipher.createCipher('AES-CBC', forge.util.hexToBytes(key));
    cipher.start({ iv: forge.util.hexToBytes(iv) });
    cipher.update(forge.util.createBuffer(inputBytes));
    cipher.finish();
       
    return cipher.output.toHex(); 
   } catch (error) {
        return ''  
   }
};

export const decryptMessage = (encryptedHex: string): string => {
  try {
    const iv = sessionStorage.getItem('iv') as string;
    const key = sessionStorage.getItem('chatKey') as string;
    const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.hexToBytes(key));
    decipher.start({ iv: forge.util.hexToBytes(iv) });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedHex)));
    const result = decipher.finish();
    if (!result) {
      throw new Error('Decryption failed');
    }
        
    return forge.util.decodeUtf8(decipher.output.getBytes());
  } catch (error) {
    return '';
  }
};

