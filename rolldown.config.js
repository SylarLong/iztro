import { defineConfig } from "rolldown";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/iztro.min.js",
      format: "umd",
      name: "iztro",
      sourcemap: true,
    },
    {
      file: "./dist/iztro.esm.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "./dist/iztro.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  treeshake: true,
});
