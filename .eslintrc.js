module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:jest/all",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-var-requires": "off",
    // Since React 17 and typescript 4.1 you can safely disable the rule
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "jest/no-hooks": "off",
    "jest/require-hook": "off",
    "jest/no-disabled-tests": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts"),
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
