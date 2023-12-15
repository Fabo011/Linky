import { store } from "@/store/store";
import forge from 'node-forge';
import { Buffer } from 'buffer';

export const generateKeyPair = () => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 4096 });

  const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
  const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);

  store.setKeyPair(privateKey, publicKey);
  return publicKey;
};

const hexStringsToOriginalKeyPair = () => {
  const publicKeyPem = store.getPublicKey();
  const privateKeyPem = store.getPrivateKey(); 

  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  return {
    privateKey,
    publicKey,
  };
}

export const encryptData = (data: any) => {
  try {
  const { publicKey } = hexStringsToOriginalKeyPair();
  console.log('key type publicKey: ' + publicKey);
    
  const maxChunkSize = 2048;

  const chunks = [];
  for (let i = 0; i < data.length; i += maxChunkSize) {
    const chunk = data.slice(i, i + maxChunkSize);
    const encryptedChunk = publicKey.encrypt(chunk, 'RSA-OAEP');
    chunks.push(Buffer.from(encryptedChunk, 'utf-8'));
  }

  /**
   * In case without chunks!
   * const encryptedData = publicKey.encrypt(data, 'RSA-OAEP');
   * const encryptedBase64 = Buffer.from(encryptedData).toString('base64');
   **/
  const concatenatedChunks = Buffer.concat(chunks);
  const encryptedBase64 = concatenatedChunks.toString('base64');

  return encryptedBase64;
  } catch (error) {
    console.log('Encryption error: ' + error);
    throw new Error('Encryption error')
    // Add rollbar
    //return '';
  }
}

export const decryptData = (data: any) => {
  const { privateKey } = hexStringsToOriginalKeyPair();

  const binaryData = Buffer.from(data, 'base64').toString();

  const decryptedData = privateKey.decrypt(binaryData, 'RSA-OAEP');
  
  return decryptedData;
}

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

export const convertPemPrivateKeyToHex = (pemPrivateKey: string) => {
  const base64String = pemPrivateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');

  const hexString = Buffer.from(base64String, 'base64').toString('hex');

  return hexString;
};


export const convertHexToPemPrivateKey = (hexPrivateKey: string) => {
  const base64String = Buffer.from(hexPrivateKey, 'hex').toString('base64');

  const matchedLines = base64String.match(/.{1,64}/g);
  if (matchedLines) {
    const pemPrivateKey =
      `-----BEGIN PRIVATE KEY-----\n` +
      matchedLines.join('\n') +
      `\n-----END PRIVATE KEY-----`;

    return pemPrivateKey;
  } else {
    console.error('Invalid base64 string format');
    return '';
  }
};


/**
 * 
 * Encrypt and decrypt chat messages 
 * 32 bytes for a 256-bit key
 */

export const generateRandomChatKey = (): string => {
  return forge.random.getBytesSync(32);
}

/*export const encryptChatMessage = (message: string, chatSecret: string) => {
  const cipher = forge.cipher.createCipher('AES-CBC', forge.util.createBuffer(chatSecret));
  cipher.start({ iv: forge.random.getBytesSync(16) });
  cipher.update(forge.util.createBuffer(message));
  cipher.finish();
  return cipher.output.toHex()
}*/


/**
 * 
 * https://github.com/digitalbazaar/forge/issues/439
 */
export const encryptChatMessage = (message: string, chatSecret: string) => {
  const iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher('AES-CBC', forge.util.createBuffer(chatSecret));
  cipher.start({ iv: forge.util.createBuffer(iv) });
  cipher.update(forge.util.createBuffer(message));
  cipher.finish();
  const encryptedMessage = iv + cipher.output.toHex();
  return encryptedMessage;
}


/*export const decryptChatMessage = (messageBase64: string, secretKey: any) => {
  try {
    const message = forge.util.hexToBytes(messageBase64);

    const decipher = forge.cipher.createDecipher('AES-CBC', secretKey);

    decipher.start({ iv: forge.util.createBuffer(message).getBytes() });
    decipher.update(forge.util.createBuffer(message));
    decipher.finish();

    const decryptedMessage = decipher.output;
    console.log(decryptedMessage);
   
    return decryptedMessage;
  } catch (error) {
    console.log('decryptionError: ' + error);
  }
}*/

export const decryptChatMessage = (messageBase64: string, secretKey: any) => {
  try {
    const message = forge.util.hexToBytes(messageBase64);

    // Extract the IV from the first 16 bytes of the message
    const iv = message.slice(0, 16);
    const encryptedMessage = message.slice(16);

    console.log('IV:', iv);
    console.log('Encrypted Message:', encryptedMessage);

    const decipher = forge.cipher.createDecipher('AES-CBC', secretKey);

    decipher.start({ iv: forge.util.createBuffer(iv) });
    decipher.update(forge.util.createBuffer(encryptedMessage));
    decipher.finish();

    const decryptedMessage = Buffer.from(decipher.output.getBytes(), 'binary');

    return decryptedMessage;
  } catch (error) {
    console.error('Decryption Error:', error);
    throw error; // Rethrow the error to signal a problem
  }
}