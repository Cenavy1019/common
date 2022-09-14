import CryptoJS from "crypto-js";
import JSEncrypt from "@imchen/rsa";
import JSEncrypt2 from "@imchen/rsa/dist/special";

// ----------------- rsa ----------------
/**
 * @description RSA加密
 * @param data 需要加密的数据
 * @param publicKey 公钥
 * @returns 加密后的数据
 *  * ```typescript
 * RSAEncrypt('加密数据', '3IjqMziS16fKO7Zt==...')
 * ```
 */
export function RSAEncrypt(data: string, publicKey: string): string {
  const encryptTool = new JSEncrypt();
  encryptTool.setPublicKey(publicKey);
  return encryptTool.encryptLong(data);
}

/**
 * @description RSA解密
 * @param data 需要解密的数据
 * @param privateKey 私钥
 * @returns 解密后的数据
 *  * ```typescript
 * RSADecrypt('加密数据', '3IjqMziS16fKO7Zt==...')
 * ```
 */
export function RSADecrypt(data: string, privateKey: string): string {
  const encryptTool = new JSEncrypt();
  encryptTool.setPrivateKey(privateKey);
  return encryptTool.decryptLong(data);
}

/**
 * @description 特殊 RSA加密
 * @param data 需要加密的数据
 * @param publicKey 公钥
 * @returns 加密后的数据
 * ```typescript
 * RSASpecialEncrypt('加密数据', '3IjqMziS16fKO7Zt==...')
 * ```
 */
export function RSASpecialEncrypt(data: string, publicKey: string): string {
  const encryptTool = new JSEncrypt2();
  encryptTool.setPublicKey(publicKey);
  return encryptTool.encryptUnicodeLong(data);
}

/**
 * @description 特殊 RSA解密
 * @param data 需要解密的数据
 * @param privateKey 私钥
 * @returns 解密后的数据
 * ```typescript
 * RSASpecialDecrypt('加密数据', '3IjqMziS16fKO7Zt==...')
 * ```
 */
export function RSASpecialDecrypt(data: string, privateKey: string): string {
  const encryptTool = new JSEncrypt2();
  encryptTool.setPrivateKey(privateKey);
  return encryptTool.decryptUnicodeLong(data);
}

// ----------------- cryptojs ----------------
/**
 * @description base64加密
 * @param rawStr
 * @returns
 * ```typescript
 * Base64Encrypt('被加密数据')
 * ```
 */
export function Base64Encrypt(rawStr: string) {
  const wordArray = CryptoJS.enc.Utf8.parse(rawStr);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
}

/**
 * @description base64解密
 * @param base64
 * @returns
 * ```typescript
 * Base64Decrypt('base64加密数据')
 * ```
 */
export function Base64Decrypt(base64: string) {
  const parsedWordArray = CryptoJS.enc.Base64.parse(base64);
  const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return parsedStr;
}

/**
 * @description aes hex解密
 * @param word
 * @param skey
 * @param siv
 * @returns
 * ```typescript
 * AESDecrypt('加密数据', '3IjqMziS16fKO7Zt', '6fjqMziS16fKO7Zt')
 * ```
 */
export function AESDecrypt(word: string, skey: string, siv: string) {
  const key = CryptoJS.enc.Utf8.parse(skey);
  const iv = CryptoJS.enc.Utf8.parse(siv);
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 * @description aes hex 加密
 * @param word
 * @param skey
 * @param siv
 * @returns hex string
 * ```typescript
 * AESEncrypt('被加密数据', '3IjqMziS16fKO7Zt', '6fjqMziS16fKO7Zt')
 * ```
 */
export function AESEncrypt(word: string, skey: string, siv: string) {
  const key = CryptoJS.enc.Utf8.parse(skey);
  const iv = CryptoJS.enc.Utf8.parse(siv);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // with base64
  // base64的aes解码见 >>>>
  // encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  return encrypted.ciphertext.toString();
}
