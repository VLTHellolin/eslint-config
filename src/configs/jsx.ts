import type { FlatConfig } from '../types';

export function jsx(): FlatConfig {
  return [
    {
      name: 'hellolin/jsx/setup',
      files: [
        // tsx files is included in the typescript config
        '**/*.?([cm])js?(x)',
      ],
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    },
  ];
}
