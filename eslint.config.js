// ESLint v9+ config migration
module.exports = [
  {
    ignores: ["node_modules/", "build/", "dist/", "uploads/"],
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: false,
        document: false,
        console: true,
        module: true,
        require: true,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
