import { expect, it } from "vitest";
import { Base64Decrypt } from "../../src/encrypt/index";

export const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuXBwnJ4j/WUqaFwFIDPP
dDb8yrcwqhiNEpNTfaESFYkzxCYAH2RqdR7xfpzffYLtspkrLw7fFyA5yjCX5v4o
Bs/fJuSY1kNt1VjkieyX35tJurgZAfNd0L05SnYRqvcnDh2yw8JNMkSqTU3rGIiQ
XimEv1sHm4eaumEsxJu5KIJI5gARGMacjzfeyS9JuBiX6zF90+6oLuZXJJMtIZnJ
duMZL3kHcI+3VJ4C8acwx+voFxC2DaOnhqxEJtUFgpW0UKw/3oxP8eItSLb+xv3a
a8OLdWqepi+1WPjfDruNfQ4RWa2Stg5f7hmaCNtub42eZE+CcTmWNNDu1eQlG+Cv
QQIDAQAB
-----END PUBLIC KEY-----`;

export const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5cHCcniP9ZSpo
XAUgM890NvzKtzCqGI0Sk1N9oRIViTPEJgAfZGp1HvF+nN99gu2ymSsvDt8XIDnK
MJfm/igGz98m5JjWQ23VWOSJ7Jffm0m6uBkB813QvTlKdhGq9ycOHbLDwk0yRKpN
TesYiJBeKYS/Wwebh5q6YSzEm7kogkjmABEYxpyPN97JL0m4GJfrMX3T7qgu5lck
ky0hmcl24xkveQdwj7dUngLxpzDH6+gXELYNo6eGrEQm1QWClbRQrD/ejE/x4i1I
tv7G/dprw4t1ap6mL7VY+N8Ou419DhFZrZK2Dl/uGZoI225vjZ5kT4JxOZY00O7V
5CUb4K9BAgMBAAECggEAJq92TrYO/AXm2u6XgyhL1wrBoeilllaY1480k7jOdP+y
dPEYhXQFYXmbF7bSSPTPcbrSb3bCw6hNZgjNJ7tNzl3/R7XYzJo0h5WL19ortNJI
h1NwpB+JKsrO8OHAvdHhq+g2KvCV+i6o+IeQzAVxWLOApgrvg1q+xLMRC9MQxYpN
iKYmjtPb9N2umpEvpRwmBQkrjVKDM4b+Z9/ufDxTHLogI3y/QCSn1F73Lnel5vW5
SEzpZ6T63M4AAN9UzFcnHRBgBtQBdtand5QK3p7lTOMmuLIXXB6ZTn+IHuPm6Odr
4WOJAlSQ5wz/fm2et1bWH1npo1e8/U5fy4nER/ZToQKBgQDgSz0giSiiSz6er3DE
69/bOfMYaAQTJ3q5T5TmPvTt/AkUSmD6bgSCiOTAajZHZGvEPoe8pE2vaqcf1nng
5h0i1zlL1xKdmU9na1JQCLvIpN3ya7UcKAq68CTmrZl1GvAEa6zQxM7Ez8zmcE7+
d/kePBMCBaXrkMKu/lr/gQPgtwKBgQDTpyAgjVMte13/YmYZIHw8cguaxuDV7VCe
AMO82I4ZxmZvmAH6ywvhfY2aW2xWBCm0IretrfjmQBrFqhiHG5K3vjbwmUznBUj0
ok7qnIVnY5L+Ojo6LNgIGF9OPdsiLgUYTIjgZAl4Jfp9wVjPvkEcuiLePlAaSyoE
CbAY1wgHxwKBgQCWaT5DzFcIhucmaUZ5eCh1jmX8LvzUj3wYO0sCIKQF2CeKiNqB
9jdmBkFI27EsrSYrwzcphRFnmmEa06yF6isNy0DsH/2m3EHIe8sGSuULB6yjPiGF
EUEo3ZQRccdgJcFhZYfNtL1odGXW/ueqdHAGG4kvqPP8heZYjdAeWbls/wKBgFQp
RLEtAUI4qCwBKLAdJsmyX8LwCj+G2mO50hup0PeW2OzO+RqM2vCTSFd0uyOJDDxB
AeDiKPMF0p9+/7nZ0QGXdak+jEHg7B263L6V9sYh5jWJWdYANvchGeS23Ag/XG9J
H7R6kvlfwLd4xqP091dA/NR62sdZ1B8+6vM1rk/JAoGBAMZsfqb6zRzigoAuW9Ds
WUpp1DX0Ld2XsCgu+apJf/8YTftUDBD+24IkODNBMKXzMkCJIiZ18qY2ZwySuCea
Sh48XHm3JNo78N3wU2WrRO+5tkQwtwx8bIHaDSc5CrJb3qYnSO+JcZszCxlMJKJL
zVk+v4b42BVuN383irNsRBEH
-----END PRIVATE KEY-----`;

it("base64Encrypt", () => {
  expect(Base64Decrypt("helloworld")).toBe("aGVsbG93b3JsZA==");
});

// it('rsaEncrypt', () => {
//   expect(RSAEncrypt('helloworld', publicKey)).toBe('helloworld')
// })

// it('rsaDecrypt', () => {
//   expect(RSADecrypt(RSAEncrypt('helloworld', publicKey), privateKey)).toBe('helloworld')
// })
