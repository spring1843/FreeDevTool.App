import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // Entry points for the app and scripts
  entry: [
    "client/src/main.tsx",
    "client/index.html",
    "scripts/**/*.ts",
    "vite.config.ts",
    "playwright.config.ts",
  ],

  // Project globs to analyze
  project: [
    "client/src/**/*.{ts,tsx}",
    "client/assets/**/*",
    "scripts/**/*.ts",
    "tests/e2e/**/*.ts",
    "shared/**/*.ts",
    "dev-server/**/*.ts",
  ],

  // Treat tests separately
  test: ["tests/e2e/**/*.ts"],

  // Ignore generated and external output directories
  ignore: [
    "dist/**",
    "node_modules/**",
    ".cache/**",
    "playwright-report/**",
    "test-results/**",
  ],

  // Ignore exports used dynamically or by conventions
  ignoreExports: [
    "client/src/pages/tools/**/*.tsx",
    "client/src/components/ui/**",
    "client/src/data/**",
  ],
};

export default config;
