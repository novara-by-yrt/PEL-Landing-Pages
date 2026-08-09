import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone CommonJS tooling scripts, run directly with `node` (no
    // "type": "module" in package.json) — not part of the app bundle, so
    // the TypeScript-aware `require()` rule doesn't apply to them.
    "scripts/**",
  ]),
]);

export default eslintConfig;
