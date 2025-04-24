const config = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/react-in-jsx-scope": "off"
  },
};

export default config;
