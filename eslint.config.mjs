import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single", { "allowTemplateLiterals": true }],
      "react/no-unescaped-entities": 0,
      semi: ["error", "never"]
    }
  }
];

export default eslintConfig;
