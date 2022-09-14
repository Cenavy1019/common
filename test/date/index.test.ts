/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { expect, it } from "vitest";
import {
  formatDate,
  formatDate2Timestamp,
  formatDateTime,
  formatDateWithLine,
  formatDateWithoutLine,
} from "../../src/date/index";

it("formateDateTime -", () => {
  expect(formatDateTime("1662097891756")).toBe("2022-09-02 14:39:34");
});

it("formateDateTime 年月日", () => {
  expect(formatDateTime("1662097891756", "年月日")).toBe(
    "2022年09月02日 14:39:34"
  );
});

it("formateDateTime /", () => {
  expect(formatDateTime("1662097891756", "/")).toBe("2022/09/02 14:39:34");
});

it("formatDateWithLine", () => {
  expect(formatDateWithLine("1662097891756")).toBe("2022-09-02");
});

it("formatDateWithoutLine", () => {
  expect(formatDateWithoutLine("1662097891756")).toBe("20220902");
});

it("formatDate", () => {
  expect(formatDate("1662097891756", "HH:mm:ss")).toBe("14:39:34");
});

it("formatDate2Timestamp", () => {
  expect(formatDate2Timestamp("2022-09-04 14:08:50")).toBe("1662271730000");
});
