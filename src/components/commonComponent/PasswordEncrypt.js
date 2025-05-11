// crypto-js-encryption.js
import CryptoJS from 'crypto-js';

// AES-128 key (16 characters = 128 bits)
const SECRET_KEY = 'R@p1dmat3@2025$';

export function encrypt(text) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.lib.WordArray.random(16); // 16-byte random IV

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return hex representations
  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    encryptedData: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
  };
}

export function decrypt(encryptedHex, ivHex) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  // Convert to Base64 string to match AES.decrypt input format
  const encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted);

  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
