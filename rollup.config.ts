import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import esbuild from "rollup-plugin-esbuild";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

const isProd = process.env.NODE_ENV === "prod";
const isCompressLibrary = isProd
  ? terser({ compress: { drop_console: true, drop_debugger: true } })
  : null;
const pkg = require("./package.json");

const libraryName = pkg.name;

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        name: libraryName,
        format: "umd",
        sourcemap: !isProd,
      },
      {
        file: pkg.module,
        name: libraryName,
        format: "esm",
        sourcemap: !isProd,
      },
    ],
    plugins: [
      commonjs(),
      resolve({
        preferBuiltins: true,
      }),
      alias(),
      json(),
      typescript(),
      // esbuild({
      //   minify: isProd,
      //   pure: isProd ? ['console.log', 'debugger'] : []
      // }),
      isCompressLibrary,
      cleanup(),
    ],
    watch: {
      include: "src/**",
      exclude: "node_modules/**",
    },
    external: [
      "dayjs",
      "crypto-js",
      "lodash-es",
      "@imchen/rsa",
      "@imchen/rsa/dist/special",
    ],
    globals: {
      dayjs: "dayjs",
      "lodash-es": "lodash-es",
      "crypto-js": "CryptoJS",
      "@imchen/rsa": "JSEncrypt",
      "@imchen/rsa/dist/special": "JSEncrypt2",
    },
  },
  {
    input: "./src/index.ts",
    output: [
      {
        file: `dist/${libraryName}.d.ts`,
        format: "esm",
      },
    ],
    plugins: [dts({ respectExternal: true })],
  },
];
