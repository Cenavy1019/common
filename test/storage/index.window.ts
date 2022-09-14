import { expect, it, beforeAll, vi } from "vitest";

import Storage from "../../src/storage/index";

const storage = new Storage({
  prefix: "dldldld",
  encrypted: true,
});
console.log("storage: ", storage);

// beforeAll(() => {
//   Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: vi.fn().mockImplementation(query => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: vi.fn(), // deprecated
//       removeListener: vi.fn(), // deprecated
//       addEventListener: vi.fn(),
//       removeEventListener: vi.fn(),
//       dispatchEvent: vi.fn()
//     }))
//   })
// })

it("storage", () => {
  expect(storage.set("test-storage", "test-val")).toBeTruthy();
  expect(storage.set("test-storage2", "test-val")).toBeTruthy();
  expect(storage.get("test-storage")).toBeTruthy();
  expect(storage.length).toBeTruthy();
  console.log("storagelength", storage.length);
  expect(storage.remove("test-storage2")).toBeTruthy();
});
