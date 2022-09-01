import CryptoJS from 'crypto-js';
// import JSEncrypt from '@imchen/rsa'
// import JSEncrypt2 from '@imchen/rsa/dist/special'

// ----------------- rsa ----------------
/**
 * RSA加密
 * @param data 需要加密的数据
 * @param key 公钥
 * @returns 加密后的数据
 */
// export function RSAEncrypt(data: string, key: string): string {
//   const encryptTool = new JSEncrypt()
//   encryptTool.setPublicKey(key)
//   return encryptTool.encryptLong(data)
// }

/**
 * RSA解密
 * @param data 需要解密的数据
 * @param key 密钥
 * @returns 解密后的数据
 */
// export function RSADecrypt(data: string, key: string): string {
//   const encryptTool = new JSEncrypt()
//   encryptTool.setPrivateKey(key)
//   return encryptTool.decryptLong(data)
// }

/**
 * 特殊 RSA加密
 * @param data 需要加密的数据
 * @param key 公钥
 * @returns 加密后的数据
 */
// export function RSASpecialEncrypt(data: string, key: string): string {
//   const encryptTool = new JSEncrypt2()
//   encryptTool.setPublicKey(key)
//   return encryptTool.encryptUnicodeLong(data)
// }

/**
 * 特殊 RSA解密
 * @param data 需要解密的数据
 * @param key 密钥
 * @returns 解密后的数据
 */
// export function RSASpecialDecrypt(data: string, key: string): string {
//   const encryptTool = new JSEncrypt2()
//   encryptTool.setPrivateKey(key)
//   return encryptTool.decryptUnicodeLong(data)
// }


// ----------------- cryptojs ----------------
/**
 * base64加密
 * @param rawStr
 * @returns
 */
export function Base64Encrypt(rawStr: string) {
  const wordArray = CryptoJS.enc.Utf8.parse(rawStr)
  const base64 = CryptoJS.enc.Base64.stringify(wordArray)
  return base64
}

/**
 * base64解密
 * @param base64
 * @returns
 */
export function Base64Decrypt(base64: string) {
  const parsedWordArray = CryptoJS.enc.Base64.parse(base64)
  const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8)
  return parsedStr
}


/**
 * aes hex解密
 * @param word
 * @param skey
 * @param siv
 * @returns
 */
 export function AESDecrypt(word: string, skey: string, siv: string) {
  const key = CryptoJS.enc.Utf8.parse(skey)
  const iv = CryptoJS.enc.Utf8.parse(siv)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/**
 * aes hex 加密
 * @param word
 * @param skey
 * @param siv
 * @returns hex string
 */
export function AESEncrypt(word: string, skey: string, siv: string) {
  const key = CryptoJS.enc.Utf8.parse(skey)
  const iv = CryptoJS.enc.Utf8.parse(siv)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  // with base64
  // base64的aes解码见 >>>>
  // encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  return encrypted.ciphertext.toString()
}