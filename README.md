# @common/rsa

### 支持任意长度字符,密钥加解密
```
  import RSAEncrypt from '@common/rsa'

  function encodeRSA (data, key) {
    const encrypt = new RSAEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encryptLong(data)
  }

  function decodeRSA (data, key) {
    const encrypt = new RSAEncrypt()
    encrypt.setPrivateKey(key)
    return encrypt.decryptLong(data)
  }
```

### 只支持本地工具库任意长度字符及密钥加解密, 用于公钥生成加密数据, 替代敏感信息, 在本地使用工具库私钥解密, 外部无解
```
  import RSASpecialEncrypt from '@common/rsa/special'

  function specialEncodeRSA (data, key) {
    const encrypt = new RSASpecialEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encryptUnicodeLong(data)
  }

  function specialDecodeRSA (data, key) {
    const encrypt = new RSASpecialEncrypt()
    encrypt.setPrivateKey(key)
    // or return encrypt.decryptLong(data)
    return encrypt.decryptUnicodeLong(data)
  }
```

