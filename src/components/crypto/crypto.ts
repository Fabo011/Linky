import * as forge from 'node-forge';
import { store } from '@/store/store';

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

export const convertStringToHex = (value: string) => {
  const encoded = new TextEncoder().encode(value);
  const hex = Array.from(encoded).map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hex;
}

export const convertHexToString = (value: string) => {
  const matchedHexPairs = value.match(/.{1,2}/g);
  if (matchedHexPairs) {
  const orgString = new TextDecoder().decode(
    Uint8Array.from(matchedHexPairs.map(byte => parseInt(byte, 16)))
  );  
    return orgString;
  } else {
    console.error('Invalid hex string format');
  }
}

export const splitDigitalKey = (digitalKey: string)  => {
  const dotIndex = digitalKey.indexOf('.');
  const key: string = digitalKey.substring(0, dotIndex);
  const iv: string = digitalKey.substring(dotIndex + 1);

  return { key, iv };
}

export const encryptString = (input: string): string => {
  try {
    const fullKey = store.getKey();
    const { key, iv } = splitDigitalKey(fullKey);
        
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

export const decryptString = (encryptedHex: string): string => {
  try {
    const fullKey = store.getKey();
    const { key, iv } = splitDigitalKey(fullKey);
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


async function stringToUint8Array(str: string) {
        const result = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            result[i] = str.charCodeAt(i);
        }
        return result;
}

async function stringKeyToCryptoKey(key: string) {
return await crypto.subtle.importKey(
            'raw',
            await stringToUint8Array(key),
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
}

export async function encryptFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const fullKey = store.getKey();
  const { key, iv } = splitDigitalKey(fullKey);
  const ivByte = await stringToUint8Array(iv);
  const keyByte = await stringKeyToCryptoKey(key); 

  return await crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv: ivByte
  },
    keyByte,
    arrayBuffer
  );
}

async function blobToArrayBuffer(blob: Blob | null): Promise<ArrayBuffer> {
  return await new Response(blob).arrayBuffer();
}

export async function decryptFile(encryptedData: Blob | null) {
 const fullKey = store.getKey();
 const { key, iv } = splitDigitalKey(fullKey);
 const ivByte = await stringToUint8Array(iv);
  const keyByte = await stringKeyToCryptoKey(key);
  const file = await blobToArrayBuffer(encryptedData);
  
 return await crypto.subtle.decrypt(
   {
     name: 'AES-GCM',
     iv: ivByte
   },
    keyByte,
    file
    );
}
