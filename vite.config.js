/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: "./unit-tests/**/*.js",
  },
})
