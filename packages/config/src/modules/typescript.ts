import type { FlatConfigItem } from '@hellolin-eslint/shared';
import type { ParserOptions } from '@typescript-eslint/parser';
import { GlobJS, GlobMarkdown, GlobTS, memorize } from '@hellolin-eslint/shared';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';

export interface TypeScriptOptions {
  inEditor?: boolean;
  /**
   * @default true
   */
  tsconfigPath?: string | boolean;
  /**
   * @default process.cwd()
   */
  tsconfigRootDir?: string;
  /**
   * Whether to check `.js(x)` files
   * @default false
   */
  checkJs?: boolean;
}

export const typescript = (options: TypeScriptOptions = {}): FlatConfigItem[] => {
  const {
    inEditor = false,
    tsconfigPath = true,
    tsconfigRootDir = process.cwd(),
    checkJs = false,
  } = options;

  const files = [
    GlobTS,
    ...checkJs ? [GlobJS] : [],
  ];
  const typeAwareIgnores = [`${GlobMarkdown}/**`];
  const enableTypeAware = !!tsconfigPath;

  const getParserOptions = (typeAware: boolean): ParserOptions => ({
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    warnOnUnsupportedTypeScriptVersion: true,
    tsconfigRootDir,
    ...typeAware && {
      projectService: {
        defaultProject: typeof tsconfigPath === 'boolean' ? undefined : tsconfigPath,
        loadTypeScriptPlugins: inEditor,
      },
    },
  });

  return [
    {
      name: 'hellolin/typescript/setup',
      files,
      plugins: {
        ts: memorize<any>(pluginTypeScript, '@typescript-eslint/eslint-plugin'),
      },
      languageOptions: {
        parser: parserTypeScript,
        parserOptions: getParserOptions(false),
      },
    },
    ...enableTypeAware ? [{
      name: 'hellolin/typescript/type-aware-setup',
      files,
      ignores: typeAwareIgnores,
      languageOptions: {
        parser: parserTypeScript,
        parserOptions: getParserOptions(true),
      },
    }] : [],
    {
      name: 'hellolin/typescript/base',
      files,
      /// keep-sorted
      rules: {
        'default-param-last': 'off',
        'no-loop-func': 'off',
        'ts/array-type': ['error', { default: 'array' }],
        'ts/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
            'ts-check': false,
          },
        ],
        'ts/consistent-type-assertions': [
          'warn',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
          },
        ],
        'ts/consistent-type-definitions': ['warn', 'interface'],
        'ts/consistent-type-imports': 'error',
        'ts/default-param-last': 'error',
        'ts/method-signature-style': ['error', 'property'],
        'ts/no-confusing-non-null-assertion': 'error',
        'ts/no-duplicate-enum-values': 'error',
        'ts/no-dynamic-delete': 'warn',
        'ts/no-empty-object-type': 'error',
        'ts/no-extra-non-null-assertion': 'error',
        'ts/no-import-type-side-effects': 'warn',
        'ts/no-invalid-void-type': 'error',
        'ts/no-loop-func': 'error',
        'ts/no-non-null-asserted-nullish-coalescing': 'error',
        'ts/no-require-imports': 'error',
        'ts/no-this-alias': ['error', { allowDestructuring: true }],
        'ts/no-unnecessary-parameter-property-assignment': 'warn',
        'ts/no-unsafe-declaration-merging': 'error',
        'ts/no-unsafe-function-type': 'error',
        'ts/no-wrapper-object-types': 'error',
        'ts/prefer-as-const': 'warn',
        'ts/prefer-for-of': 'warn',
      },
    },
    ...enableTypeAware ? [{
      name: 'hellolin/typescript/type-aware',
      files,
      ignores: typeAwareIgnores,
      /// keep-sorted
      rules: {
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'no-throw-literal': 'off',
        'prefer-promise-reject-errors': 'off',
        'ts/await-thenable': 'error',
        'ts/consistent-type-exports': 'warn',
        'ts/dot-notation': ['error', { allowKeywords: true }],
        'ts/naming-convention': [
          'warn',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'allowSingleOrDouble',
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'allowSingleOrDouble',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'allowSingleOrDouble',
          },
        ],
        'ts/no-array-delete': 'error',
        'ts/no-base-to-string': 'error',
        'ts/no-confusing-void-expression': 'error',
        'ts/no-deprecated': 'warn',
        'ts/no-duplicate-type-constituents': 'warn',
        'ts/no-floating-promises': 'error',
        'ts/no-for-in-array': 'error',
        'ts/no-implied-eval': 'error',
        'ts/no-meaningless-void-operator': 'error',
        'ts/no-misused-promises': ['error', {
          checksConditionals: true,
          checksVoidReturn: false,
        }],
        'ts/no-misused-spread': 'error',
        'ts/no-redundant-type-constituents': 'warn',
        'ts/no-unnecessary-boolean-literal-compare': 'warn',
        'ts/no-unnecessary-condition': 'warn',
        'ts/no-unnecessary-qualifier': 'warn',
        'ts/no-unnecessary-template-expression': 'warn',
        'ts/no-unnecessary-type-constraint': 'warn',
        'ts/no-unnecessary-type-conversion': 'warn',
        'ts/no-unnecessary-type-parameters': 'warn',
        'ts/no-unsafe-enum-comparison': 'warn',
        'ts/no-unsafe-unary-minus': 'error',
        'ts/only-throw-error': 'error',
        'ts/prefer-includes': 'warn',
        'ts/prefer-optional-chain': 'warn',
        'ts/prefer-promise-reject-errors': 'error',
        'ts/prefer-return-this-type': 'error',
        'ts/related-getter-setter-pairs': 'error',
        'ts/restrict-template-expressions': [
          'error',
          { allowNumber: true, allowAny: true, allowBoolean: true, allowNever: true },
        ],
        'ts/return-await': ['error', 'in-try-catch'],
      },
    }] as FlatConfigItem[] : [],
    {
      name: 'hellolin/typescript/style',
      files: [
        GlobTS,
        ...checkJs ? [GlobJS] : [],
      ],
      /// keep-sorted
      rules: {
        'style/member-delimiter-style': 'error',
        'style/type-annotation-spacing': ['error', {
          before: false,
          after: true,
          overrides: {
            arrow: { before: true, after: true },
          },
        }],
      },
    },
  ];
};
