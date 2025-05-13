import CryptoJS from 'crypto-js';

// console.log("Console log :::::::::::::;;;for crypto", CryptoJS)

const SECRET_KEY = 'R@p1dmat3@2025$20250525023532345'; // Must be 16 chars for AES-128

// Encrypt function
export function encrypt(text) {
  // const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  // const iv = CryptoJS.lib.WordArray.random(16); // AES block size = 16 bytes

  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY); // 32 chars
  const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 chars

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

  // return {
  //   iv: iv.toString(CryptoJS.enc.Hex),
  //   encryptedData: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
  // };
}

// Decrypt function
export function decrypt(encryptedHex, ivHex) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  const encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted);

  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8); // Returns original plaintext
}
