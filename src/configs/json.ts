import type { FlatConfig, ResolvedOptions, Rules } from '../types';
import pluginJson from 'eslint-plugin-jsonc';
import parserJson from 'jsonc-eslint-parser';
import { extractOptionValue } from '../options';

export function json(options: ResolvedOptions): FlatConfig {
  const jsonType = extractOptionValue(options.json, 'type', 'json');

  const jsonOnlyRules: Rules = jsonType === 'json' ? {
    'json/no-comments': 'error',
    'json/comma-dangle': 'error',
    'json/indent': ['error', 2],
  } : {};

  const jsonAndJsoncRules: Rules = jsonType !== 'json5' ? {
    'json/no-hexadecimal-numeric-literals': 'error',
    'json/no-infinity': 'error',
    'json/no-nan': 'error',
    'json/no-plus-sign': 'error',
    'json/valid-json-number': 'error',
    'json/no-floating-decimal': 'error',
    'json/no-multi-str': 'error',
    'json/quote-props': 'error',
  } : {};

  const jsoncAndJson5Rules: Rules = jsonType !== 'json' ? {
    'json/comma-dangle': ['error', 'always-multiline'],
  } : {};

  const json5OnlyRules: Rules = jsonType === 'json5' ? {
    'json/quotes': ['error', 'single', { avoidEscape: true }],
  } : {};

  const standardRules: Rules = {
    'json/no-bigint-literals': 'error',
    'json/no-binary-expression': 'error',
    'json/no-binary-numeric-literals': 'error',
    'json/no-escape-sequence-in-identifier': 'error',
    'json/no-number-props': 'error',
    'json/no-numeric-separators': 'error',
    'json/no-octal-numeric-literals': 'error',
    'json/no-parenthesized': 'error',
    'json/no-regexp-literals': 'error',
    'json/no-template-literals': 'error',
    'json/no-undefined-value': 'error',
    'json/no-unicode-codepoint-escapes': 'error',
    'json/vue-custom-block/no-parsing-error': 'error',
    'json/no-dupe-keys': 'error',
    'json/no-octal': 'error',
    'json/no-sparse-arrays': 'error',
    'json/no-useless-escape': 'error',
    'json/space-unary-ops': 'error',
  };

  return [
    {
      name: 'hellolin/json/setup',
      plugins: { json: pluginJson as any },
    },
    {
      name: 'hellolin/json/rules',
      files: ['**/*.json?([c5])'],
      languageOptions: {
        parser: parserJson,
      },
      rules: {
        ...jsonOnlyRules,
        ...jsonAndJsoncRules,
        ...jsoncAndJson5Rules,
        ...json5OnlyRules,
        ...standardRules,
      },
    },
  ];
}
