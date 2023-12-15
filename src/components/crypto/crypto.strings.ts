import { Buffer } from 'buffer';
import { hexStringsToOriginalKeyPair } from './crypto';

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