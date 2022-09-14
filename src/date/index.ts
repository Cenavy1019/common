/*
 * @Desc: 常用日期格式处理
 * @Author: hankin.dream
 * @Date: 2022-09-02 11:22:53
 */
import dayjs from "dayjs";

type DATE_TYPE = Date | number | string;
type SPACE_CHARACTER = "/" | "" | "-" | "_" | "年月日";

const DATE_FORMAT = (spaceCharacter: SPACE_CHARACTER) => {
  if (spaceCharacter === "年月日") {
    return `YYYY年MM月DD日`;
  }
  return `YYYY${spaceCharacter}MM${spaceCharacter}DD`;
};

const DATE_TIME_FORMAT = "HH:mm:ss";

/**
 * @description: 格式化日期, 可自定义格式
 * @param date
 * @param format
 * @returns
 * ```typescript
 * formatDate('1662097891756', 'YYYY-MM-DD')
 * formatDate('1662097891756', 'YYYY-MM-DD HH:mm:ss')
 * formatDate('1662097891756', 'HH:mm:ss')
 * formatDate('1662097891756', 'YYYY/MM/DD')
 * formatDate('1662097891756', 'YYYY年MM月DD日')
 * ```
 */
export function formatDate(
  date: DATE_TYPE = Date.now(),
  format: string = DATE_FORMAT("-")
): string {
  return dayjs(date).format(format);
}

/**
 * @description: 格式化日期时间, 默认示意结果: 2022-09-02 13:53:32
 * @param date
 * @returns
 * ```typescript
 * formatDateTime('1662097891756', '-')
 * formatDateTime('1662097891756', '/')
 * formatDateTime('1662097891756', '')
 * formatDateTime('1662097891756', '年月日')
 * formatDateTime('1662097891756', '_')
 * ```
 */
export function formatDateTime(
  date: DATE_TYPE = Date.now(),
  spaceCharacter: SPACE_CHARACTER = "-"
): string {
  return formatDate(date, `${DATE_FORMAT(spaceCharacter)} ${DATE_TIME_FORMAT}`);
}

/**
 * @description: 常用不带分隔线的格式化日期, 示意结果: 20220902
 * @param date
 * @returns
 * ```typescript
 * formatDateWithoutLine('1662097891756')
 * ```
 */
export function formatDateWithoutLine(date: DATE_TYPE = Date.now()): string {
  return formatDate(date, DATE_FORMAT(""));
}

/**
 * @description: 常用带分隔线的格式化日期, 示意结果: 2022-09-02
 * @param date
 * @returns
 * ```typescript
 * formatDateWithLine('1662097891756')
 * ```
 */
export function formatDateWithLine(date: DATE_TYPE = Date.now()): string {
  return formatDate(date, DATE_FORMAT("-"));
}

/**
 * @remarks 将日期转换为时间戳
 * @param date - 日期, 支持 YYYY-MM-DD, YYYY/MM/DD, YYYY-MM-DD HH:mm:ss ...
 * @returns  date timestamp, type is number
 * @example
 * ```ts
 * formatDate2Timestamp("2022-09-04 14:08:50") -> 1662271730000
 * ```
 */
export function formatDate2Timestamp(date: DATE_TYPE): number {
  return dayjs(date).valueOf();
}

export const dateUtil = dayjs;
