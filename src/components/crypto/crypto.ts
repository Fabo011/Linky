/**
 * This crypto file encrypt and decrypt all object data like links, notes etc.
 */

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

export const hexStringsToOriginalKeyPair = () => {
  const publicKeyPem = store.getPublicKey();
  const privateKeyPem = store.getPrivateKey(); 

  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  return {
    privateKey,
    publicKey,
  };
}

export const encryptData = (data: any): string => {
  try {
    const { publicKey } = hexStringsToOriginalKeyPair();
    const jsonString = JSON.stringify(data);

    // Maximum chunk size for RSA encryption
    const maxChunkSize = 190; // You may need to adjust this based on your key size

    // Convert the JSON string to UTF-8 bytes
    const jsonBytes = forge.util.createBuffer(jsonString, 'utf8');

    // Split the data into chunks
    const chunks = [];
    while (jsonBytes.length() > 0) {
      const chunk = jsonBytes.getBytes(maxChunkSize);
      const encryptedChunk = publicKey.encrypt(chunk, 'RSA-OAEP');
      chunks.push(encryptedChunk);
    }

    // Concatenate the encrypted chunks
    const concatenatedChunks = forge.util.createBuffer();
    chunks.forEach(chunk => concatenatedChunks.putBytes(chunk));
    
    const encryptedData = forge.util.encode64(concatenatedChunks.getBytes());

    return encryptedData;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption error');
  }
};


export const decryptData = (encryptedData: string): any => {
  try {
    const { privateKey } = hexStringsToOriginalKeyPair();

    const encryptedBytes = forge.util.decode64(encryptedData);

    const encryptedBuffer = forge.util.createBuffer(encryptedBytes);
    const chunks = [];
    while (encryptedBuffer.length() > 0) {
      const chunk = encryptedBuffer.getBytes(privateKey.n.bitLength() / 8);
      const decryptedChunk = privateKey.decrypt(chunk, 'RSA-OAEP');
      chunks.push(decryptedChunk);
    }

    const decryptedData = JSON.parse(forge.util.decodeUtf8(chunks.join('')));

    return decryptedData;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption error');
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

export const convertPemPrivateKeyToHex = (pemPrivateKey: string) => {
  const base64String = pemPrivateKey
    .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
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