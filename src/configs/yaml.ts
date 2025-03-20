import type { FlatConfig } from '../types';
import pluginYaml from 'eslint-plugin-yml';
import parserYaml from 'yaml-eslint-parser';

export function yaml(): FlatConfig {
  return [
    {
      name: 'hellolin/yaml/setup',
      plugins: { yaml: pluginYaml as any },
    },
    {
      name: 'hellolin/yaml/rules',
      files: ['**/*.y?(a)ml'],
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        'yaml/block-mapping-question-indicator-newline': 'error',
        'yaml/block-mapping': 'error',
        'yaml/block-sequence-hyphen-indicator-newline': 'error',
        'yaml/block-sequence': 'error',
        'yaml/indent': ['error', 2],
        'yaml/no-empty-document': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-mapping-value': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/quotes': [
          'error',
          {
            prefer: 'single',
            avoidEscape: true,
          },
        ],
        'yaml/flow-mapping-curly-newline': 'error',
        'yaml/flow-mapping-curly-spacing': 'error',
        'yaml/flow-sequence-bracket-newline': 'error',
        'yaml/flow-sequence-bracket-spacing': 'error',
        'yaml/key-spacing': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/spaced-comment': 'error',
      },
    },
  ];
}
