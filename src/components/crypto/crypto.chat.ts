import forge from 'node-forge';
import { Buffer } from 'buffer';

export const generateChatKeyPair = () => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

  const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
  const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);

  return { privateKey, publicKey };
};

const convertPublicKeyToOriginal = (publicKeyPem: string) => {
    return forge.pki.publicKeyFromPem(publicKeyPem);
};

const convertPrivateKeyToOriginal = (privateKeyPem: string) => {
    return forge.pki.privateKeyFromPem(privateKeyPem);
};


export const encryptData = (data: any, publicKeyPem: string) => {
  try {
    const publicKey = convertPublicKeyToOriginal(publicKeyPem);
    
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
  }
}

export const decryptData = (data: any, privateKeyPem: string) => {
  const privateKey = convertPrivateKeyToOriginal(privateKeyPem);

  const binaryData = Buffer.from(data, 'base64').toString();

  const decryptedData = privateKey.decrypt(binaryData, 'RSA-OAEP');
  
  return decryptedData;
}