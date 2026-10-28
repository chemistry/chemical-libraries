import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const packages = ['common', 'elements', 'formula', 'math', 'molecule', 'space-groups'];

export default tseslint.config(
  { ignores: ['**/dist/', '**/node_modules/', 'coverage/'] },
  {
    files: ['packages/*/src/**/*.ts', 'scripts/**/*.js'],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        project: packages.map((name) => `./packages/${name}/tsconfig.eslint.json`),
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'], custom: { regex: '^[A-Z]', match: true } },
        { selector: 'typeAlias', format: ['PascalCase'] },
      ],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
      curly: 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      // Cross-package imports resolve to unbuilt dist types during lint
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['scripts/**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        URL: 'readonly',
      },
    },
  }
);
