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
    "@typescript-eslint/no-unused-vars": ["warn", {
      "vars": "all", // 모든 변수 체크
      "args": "after-used", // 사용되지 않는 매개변수 감지 (마지막부터)
      "ignoreRestSiblings": true, // 구조분해에서 나머지 요소 무시
      "argsIgnorePattern": "^_", // `_`로 시작하면 사용되지 않아도 허용
      "varsIgnorePattern": "^_" // 변수도 `_`로 시작하면 허용
    }],
    "react/react-in-jsx-scope": "off",

  },
};

export default config;
