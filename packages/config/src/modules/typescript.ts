import { type FlatConfigItem, GlobJS, GlobTests, GlobTS, memorize } from '@hellolin-eslint/shared';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';

export interface TypeScriptOptions {
  /**
   * @default process.cwd()
   */
  tsconfigRootDir?: string;
  /**
   * Whether to check in `.js(x)` files
   * @default false
   */
  checkJs?: boolean;
}

export const typescript = (options: TypeScriptOptions = {}): FlatConfigItem[] => {
  const {
    tsconfigRootDir = process.cwd(),
    checkJs = false,
  } = options;

  return [
    {
      name: 'hellolin/typescript/base',
      files: [
        GlobTS,
        ...checkJs ? [GlobJS] : [],
      ],
      languageOptions: {
        parser: parserTypeScript,
        sourceType: 'module',
        parserOptions: {
          sourceType: 'module',
          projectService: true,
          tsconfigRootDir,
          ecmaFeatures: { jsx: true },
          warnOnUnsupportedTypeScriptVersion: true,
        },
      },
      plugins: {
        ts: memorize<any>(pluginTypeScript, '@typescript-eslint/eslint-plugin'),
      },
      /// keep-sorted
      rules: {
        'no-array-constructor': 'off',
        'no-implied-eval': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'prefer-promise-reject-errors': 'off',
        'ts/await-thenable': 'error',
        'ts/no-array-constructor': 'error',
        'ts/no-array-delete': 'error',
        'ts/no-base-to-string': 'error',
        'ts/no-confusing-void-expression': 'error',
        'ts/no-deprecated': 'warn',
        'ts/no-duplicate-enum-values': 'error',
        'ts/no-duplicate-type-constituents': 'error',
        'ts/no-dynamic-delete': 'error',
        'ts/no-empty-object-type': 'warn',
        'ts/no-extra-non-null-assertion': 'error',
        'ts/no-extraneous-class': 'error',
        'ts/no-floating-promises': 'error',
        'ts/no-implied-eval': 'error',
        'ts/no-invalid-void-type': 'error',
        'ts/no-meaningless-void-operator': 'error',
        'ts/no-misused-new': 'error',
        'ts/no-misused-promises': 'error',
        'ts/no-misused-spread': 'error',
        'ts/no-mixed-enums': 'error',
        'ts/no-non-null-asserted-nullish-coalescing': 'error',
        'ts/no-redundant-type-constituents': 'error',
        'ts/no-this-alias': 'error',
        'ts/no-unnecessary-condition': 'error',
        'ts/no-unnecessary-template-expression': 'error',
        'ts/no-unnecessary-type-arguments': 'warn',
        'ts/no-unnecessary-type-assertion': 'error',
        'ts/no-unnecessary-type-constraint': 'error',
        'ts/no-unnecessary-type-parameters': 'warn',
        'ts/no-unsafe-declaration-merging': 'error',
        'ts/no-unsafe-enum-comparison': 'warn',
        'ts/no-unsafe-function-type': 'warn',
        'ts/no-unsafe-unary-minus': 'error',
        'ts/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'ts/no-unused-vars': 'warn',
        'ts/no-useless-constructor': 'error',
        'ts/no-wrapper-object-types': 'warn',
        'ts/only-throw-error': 'warn',
        'ts/prefer-as-const': 'error',
        'ts/prefer-literal-enum-member': 'warn',
        'ts/prefer-namespace-keyword': 'warn',
        'ts/prefer-promise-reject-errors': 'error',
        'ts/prefer-return-this-type': 'error',
        'ts/related-getter-setter-pairs': 'error',
        'ts/restrict-plus-operands': 'error',
        'ts/restrict-template-expressions': 'warn',
        'ts/return-await': ['error', 'in-try-catch'],
        'ts/unbound-method': 'error',
        'ts/unified-signatures': 'error',
      },
    },
    {
      name: 'hellolin/typescript/style',
      files: [
        GlobTS,
        ...checkJs ? [GlobJS] : [],
      ],
      rules: {
        'ts/consistent-type-definitions': 'error',
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        }],
        'style/member-delimiter-style': 'error',
        'style/type-annotation-spacing': ['error', {
          before: false,
          after: true,
        }],
      },
    },
    {
      name: 'hellolin/typescript/test',
      files: [
        GlobTests,
      ],
      rules: {
        'ts/no-unused-expressions': 'off',
      },
    },
  ];
};
