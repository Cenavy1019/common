

import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import { terser } from "rollup-plugin-terser";

const isProd = process.env.NODE_ENV === 'prod';
const isCompressLibrary =
  isProd ? terser({ module: true, toplevel: true }) : null;
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
        sourcemap: !isProd
      },
      {
        file: pkg.module, 
        name: libraryName, 
        format: "esm", 
        sourcemap: !isProd
      }

    ],
    plugins: [
      commonjs(),
      resolve({
        preferBuiltins: true
      }),
      alias(),
      json(),
      typescript(),
      isCompressLibrary,
      esbuild({
        minify: isProd
      })
    ],
    watch: {
      include: "src/**",
      exclude: "node_modules/**",
    },
    external: ["crypto-js", "lodash-es", "@imchen/rsa", "@imchen/rsa/dist/special"],
    globals: {
      "lodash-es": "lodash-es",
      "crypto-js": "CryptoJS",
      "@imchen/rsa": "JSEncrypt",
      "@imchen/rsa/dist/special": "JSEncrypt2"
    }
  },
  {
    input: "./src/index.ts",
    output: [{
      file: `dist/${libraryName}.d.ts`, format: "esm",
    }],
    plugins: [dts()],
    external: ['lodash-es', 'crypto-js', "@imchen/rsa",  "@imchen/rsa/dist/special"],

  }]

