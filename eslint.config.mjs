import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "dist/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local dev/QA scratch: vendored three.js copies, screenshots, harness scripts.
    "tmp/**",
    "public/tmp-render/**",
    "_docx-qa/**",
    "_docx-qa2/**",
    "_media-review/**",
    "_media-review2/**",
    "_resume-review/**",
    ".docx-review/**",
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  jsxA11y.flatConfigs.recommended,
  next.configs["core-web-vitals"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // react-three-fiber renders three.js objects as JSX intrinsics
    // (<group>, <primitive>, <ambientLight>, shadow-camera-* props).
    // The DOM-oriented rule cannot know these members.
    files: ["app/components/viewer/**/*.tsx"],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
  {
    // Vinext client runtime requires native <a> tags for production navigation stability.
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);

export default eslintConfig;
