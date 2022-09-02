/*
 * @Desc: webstorage
 * @Author: hankin.dream
 * @Date: 2022-04-08 17:49:30
 */
import { isUndefined, isNull, isEmpty } from 'lodash-es'
import { AESEncrypt, AESDecrypt } from '../encrypt'

export enum CacheTypeEnum {
  LOCAL = 'local',
  SESSION = 'session'
}

type DriverType = 'local' | 'session'

interface Options {
  prefix: string,
  driverType: DriverType
  encrypted: boolean
  key: string
  iv: string
}

const hdkey = 'E1XyCOBdnwc08bHN'
const hdiv = 'AGo9kUW4enwHCT1I'

class WebStorage {
  public readonly storage: Storage
  public static webStorageInstance: WebStorage
  public readonly prefix: Options["prefix"]
  public readonly driver: Options['driverType']
  public encrypted: Options['encrypted']
  public hdkey: Options['key']
  public hdiv: Options['iv']

  /**
   * @description cache storage
   * @param prefix cache key prefix
   * @param driverType local or session
   * @param encrypted Whether to encrypt the cache
   * @param key custom aes key, param `encrypted` is required and set `true`
   * @param iv custom aes iv, param `encrypted` is required and set `true`
   */
  constructor({ prefix, driverType, encrypted, key, iv }: Partial<Options>) {
    this.prefix = prefix ? prefix + '_' : ''
    this.driver = driverType || CacheTypeEnum.LOCAL
    this.encrypted = encrypted || false
    this.hdkey = key || hdkey
    this.hdiv = iv || hdiv
    this.storage = this.resolveDriver(this.driver)
  }

  // public static createInstance() {
  //   if (!this.webStorageInstance) {
  //     this.webStorageInstance = new WebStorage()
  //   }
  //   return this.webStorageInstance
  // }

  private _aesEncrypt(value: string): string {
    return AESEncrypt(value, this.hdkey, this.hdiv)
  }

  private _aesDecrypt(value: string): string {
    return AESDecrypt(value, this.hdkey, this.hdiv)
  }

  prefixKey(key: string): string {
    return this.prefix + String(key)
  }

  /**
   * @description get aes key & iv
   * @returns 
   */
  getKeyIv(): { key: string, iv: string } {
    return {
      key: this.hdkey,
      iv: this.hdiv
    }
  }

  /**
   * @description set cache
   * @param key cache key
   * @param value cache value
   * @param expire cache time, the unit is seconds
   * @returns
   */
  set(key: string, value: unknown, expire?: number | null): WebStorage {
    let stringValue: unknown = null
    if (value) {
      if (expire) {
        stringValue = {
          value: this.encrypted ? this._aesEncrypt(JSON.stringify(value)) : value,
          expire: !isNull(expire) && !isUndefined(expire) ? Date.now() + expire * 1000 : null
        }
      } else {
        stringValue = this.encrypted ? this._aesEncrypt(JSON.stringify(value)) : value
      }
    }
    this.storage.setItem(this.prefixKey(key), JSON.stringify(stringValue))
    return this
  }

  /**
   * @description get cache
   * @param key cache key
   * @param defaultValue if the cache value does not exist, it can be used as an initial value
   * @returns
   */
  get<T = any>(key: string, defaultValue: string | any = null): T {
    /** MARK: 获取key时需要再次加密来对应本地加密后的key */
    const item = this.storage.getItem(this.prefixKey(key))
    const storedValue: null | any = (!isNull(item) && !isUndefined(item)) ? JSON.parse(item as string) : null

    if (isNull(storedValue)) {
      return defaultValue
    }

    if (!isEmpty(storedValue)) {
      const { value, expire } = storedValue
      if (value) {
        if (expire && Number(expire) < Date.now()) {
          this.remove(key)
        } else {
          return this.encrypted  ? JSON.parse(this._aesDecrypt(value)) : value
        }
      }
    }

    return (this.encrypted && !isNull(storedValue)) ? JSON.parse(this._aesDecrypt(storedValue.value)) : storedValue
  }

  /**
   * @description remove cache
   * @param key cache key
   * @returns
   */
  remove(key: string): WebStorage {
    this.storage.removeItem(this.prefixKey(key))
    return this
  }

  /**
   * @description remove all cache
   * @param force default `false`; set `false` clear the cache generated by the current instance, set `true` clear all cache
   */
  clear(force = false): void {
    if (force) {
      this.storage.clear()
    } else {
      this.keys(true).map((key) => {
        this.storage.removeItem(key)
      })
    }
  }

  /**
   * @description get all cache key list
   * @param withPrefix: default false, without prefix when it's false, And vice
   * @returns
   */
  keys(withPrefix = false): string[] {
    const keys: string[] = []

    Object.keys(this.storage).forEach((keyName) => {
      if (keyName.substring(0, this.prefix.length) === this.prefix) {
        keys.push(withPrefix ? keyName : keyName.substring(this.prefix.length))
      }
    })

    return keys
  }

  /**
   * @description check key
   * @param key 
   * @returns
   */
  hasKey(key: string): boolean {
    return this.keys().indexOf(key) !== -1
  }

  /**
   * @description get all key length
   * @returns
   */
  length(): number {
    return this.keys().length
  }

  private resolveDriver(driver: DriverType): Storage {
    switch (driver) {
      case 'local':
        return window.localStorage
      case 'session':
        return window.sessionStorage
      default:
        throw new Error(`Unknown driver supplied: ${driver}`)
    }
  }
}

export default WebStorage