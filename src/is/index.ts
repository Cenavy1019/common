/*
 * @Desc: 常用is
 * @Author: hankin.dream
 * @Date: 2022-09-02 10:56:57
 */

export const isServer = typeof window === "undefined";
export const isClient = !isServer;
export const isProd = process.env.NODE_ENV === "prod";

/**
 * @description: 是否为http地址
 * @param path
 * @returns
 * ```typescript
 * isUrl('http://xxx.com')
 * ```
 */
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * @description: 是否为中文
 * @param name
 * @returns
 * ```typescript
 * isChinese('中文')
 * ```
 */
export function isChinese(name: string): boolean {
  const reg = /^(?:[\u4e00-\u9fa5·]{1})$/;
  return reg.test(name);
}

/**
 * @description: 是否为统一社会信用代码
 * @param code
 * @returns
 * ```typescript
 * isUscCode('2001Gf2kxs555')
 * ```
 */
export function isUscCode(code: string): boolean {
  const reg = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
  return reg.test(code);
}

/**
 * @description: 是否为手机号码格式
 * @param phoneNumber
 * @returns
 * ```typescript
 * isPhone('13920398744')
 * ```
 */
export function isPhone(phoneNumber: string): boolean {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  return reg.test(phoneNumber);
}

/**
 * @description: 仅校验是否为身份证格式,不保证合法性
 * @param idCard
 * @returns
 * ```typescript
 * isIdCard('320102200003039428')
 * ```
 */
export function isIdCard(idCard: string): boolean {
  const reg =
    /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  return reg.test(idCard);
}
