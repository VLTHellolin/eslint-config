import type { FlatConfigItem } from '@hellolin-eslint/shared';
import pluginYaml from 'eslint-plugin-yml';
import parserYaml from 'yaml-eslint-parser';

export const yaml = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/yaml',
      files: ['**/*.y?(a)ml'],
      plugins: { yaml: pluginYaml as any },
      languageOptions: {
        parser: parserYaml,
      },
      /// keep-sorted
      rules: {
        'yaml/block-mapping-question-indicator-newline': 'error',
        'yaml/block-mapping': 'error',
        'yaml/block-sequence-hyphen-indicator-newline': 'error',
        'yaml/block-sequence': 'error',
        'yaml/flow-mapping-curly-newline': 'error',
        'yaml/flow-mapping-curly-spacing': 'error',
        'yaml/flow-sequence-bracket-newline': 'error',
        'yaml/flow-sequence-bracket-spacing': 'error',
        'yaml/indent': ['error', 2],
        'yaml/key-spacing': 'error',
        'yaml/no-empty-document': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-mapping-value': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/quotes': [
          'error',
          {
            prefer: 'single',
            avoidEscape: true,
          },
        ],
        'yaml/spaced-comment': 'error',
      },
    },
  ];
};
