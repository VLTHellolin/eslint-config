import process from 'node:process';
import type { FlatConfig, ResolvedOptions, Rules } from '../types';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';
import { extractOptionValue } from '../options';

export function typescript(options: ResolvedOptions): FlatConfig {
  const enableStrict = extractOptionValue(options.typescript, 'strict', true);
  const enableStylistic = extractOptionValue(options.typescript, 'stylistic', true);
  const enableAnyRelatedRules = extractOptionValue(options.typescript, 'enableAnyRelatedRules', true);

  const standardRules: Rules = {
    'ts/await-thenable': 'error',
    'no-array-constructor': 'off',
    'ts/no-array-constructor': 'error',
    'ts/no-array-delete': 'error',
    'ts/no-base-to-string': 'error',
    'ts/no-duplicate-enum-values': 'error',
    'ts/no-duplicate-type-constituents': 'error',
    'ts/no-empty-object-type': 'warn',
    'ts/no-extra-non-null-assertion': 'error',
    'ts/no-floating-promises': 'error',
    'no-implied-eval': 'off',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-new': 'error',
    'ts/no-misused-promises': 'error',
    'ts/no-redundant-type-constituents': 'error',
    'ts/no-this-alias': 'error',
    'ts/no-unnecessary-type-assertion': 'error',
    'ts/no-unnecessary-type-constraint': 'error',
    'ts/no-unsafe-declaration-merging': 'error',
    'ts/no-unsafe-enum-comparison': 'warn',
    'ts/no-unsafe-function-type': 'warn',
    'ts/no-unsafe-unary-minus': 'error',
    'no-unused-expressions': 'off',
    'ts/no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTaggedTemplates: true,
      allowTernary: true,
    }],
    'no-unused-vars': 'off',
    'ts/no-unused-vars': 'warn',
    'ts/no-wrapper-object-types': 'warn',
    'ts/only-throw-error': 'warn',
    'ts/prefer-as-const': 'error',
    'ts/prefer-namespace-keyword': 'warn',
    'prefer-promise-reject-errors': 'off',
    'ts/prefer-promise-reject-errors': 'error',
    'ts/restrict-plus-operands': 'error',
    'ts/restrict-template-expressions': 'warn',
    'ts/return-await': ['error', 'in-try-catch'],
    'ts/unbound-method': 'error',
  };
  const strictRules: Rules = enableStrict ? {
    'ts/no-confusing-void-expression': 'error',
    'ts/no-deprecated': 'warn',
    'ts/no-dynamic-delete': 'error',
    'ts/no-extraneous-class': 'error',
    'ts/no-invalid-void-type': 'error',
    'ts/no-meaningless-void-operator': 'error',
    'ts/no-misused-spread': 'error',
    'ts/no-mixed-enums': 'error',
    'ts/no-non-null-asserted-nullish-coalescing': 'error',
    'ts/no-unnecessary-condition': 'error',
    'ts/no-unnecessary-template-expression': 'error',
    'ts/no-unnecessary-type-arguments': 'warn',
    'ts/no-unnecessary-type-parameters': 'warn',
    'no-useless-constructor': 'off',
    'ts/no-useless-constructor': 'error',
    'ts/prefer-literal-enum-member': 'warn',
    'ts/prefer-return-this-type': 'error',
    'ts/related-getter-setter-pairs': 'error',
    'ts/unified-signatures': 'error',
  } : {};
  const stylisticRules: Rules = enableStylistic ? {
    'ts/consistent-type-definitions': 'error',
    'ts/consistent-type-imports': ['error', {
      disallowTypeAnnotations: false,
      fixStyle: 'separate-type-imports',
      prefer: 'type-imports',
    }],
  } : {};
  const anyRelatedRules: Rules = enableAnyRelatedRules ? {
    'ts/no-explicit-any': 'error',
    'ts/no-unsafe-argument': 'error',
    'ts/no-unsafe-assignment': 'error',
    'ts/no-unsafe-call': 'error',
    'ts/no-unsafe-member-access': 'error',
    'ts/no-unsafe-return': 'error',
  } : {};

  return [
    {
      name: 'hellolin/typescript/setup',
      plugins: { ts: pluginTypescript as any },
    },
    {
      name: 'hellolin/typescript/parser',
      files: [
        '**/*.?([cm])ts?(x)',
      ],
      languageOptions: {
        parser: parserTypescript,
        parserOptions: {
          sourceType: 'module',
          projectService: true,
          tsconfigRootDir: extractOptionValue(options.typescript, 'tsconfigRootDir', '') || process.cwd(),
        },
      },
    },
    {
      name: 'hellolin/typescript/rules',
      files: [
        '**/*.?([cm])ts?(x)',
      ],
      rules: {
        ...standardRules,
        ...strictRules,
        ...stylisticRules,
        ...anyRelatedRules,
      },
    },
  ];
}
