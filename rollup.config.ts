

import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import { terser } from "rollup-plugin-terser";

const currentNodeEnv = process.env.NODE_ENV;
const isCompressLibrary =
  currentNodeEnv === "prod" ? terser({ module: true, toplevel: true }) : null;
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
        sourcemap: true
      },
      { file: pkg.module, name: libraryName, format: "esm", sourcemap: true
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
        minify: process.env.NODE_ENV === 'prod'
      })
    ],
    watch: {
      include: "src/**",
      exclude: "node_modules/**",
    },
    external: ["crypto-js", "lodash-es", "@imchen/rsa"],
    globals:{
      "lodash-es": "lodash-es",
      "crypto-js": "CryptoJS",
      "@imchen/rsa": "@imchen/rsa"
    }
  },
  {
    input: "./src/index.ts",
    output: [{ file: `dist/${libraryName}.d.ts`, format: "esm",
  }],
    plugins: [dts()],
    external: ['lodash', 'lodashEs', 'CryptoJs', 'encryptlong', "@imchen/rsa"],
    
  }]

