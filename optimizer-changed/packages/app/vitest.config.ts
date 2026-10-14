import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    deps: {
      optimizer: {
        ssr: { enabled: process.env.PREBUNDLE === "1", include: ["@repro/lib"] },
      },
    },
  },
});
