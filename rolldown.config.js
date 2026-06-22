import { defineConfig } from "rolldown";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "./dist/iztro.min.js",
    format: "umd",
    name: "iztro",
    sourcemap: true,
  },
  treeshake: true,
});
