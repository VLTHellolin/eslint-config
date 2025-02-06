import type { FlatConfig } from '../types';

export function jsx(): FlatConfig {
  return [
    {
      name: 'hellolin/jsx/setup',
      files: [
        '**/*.?([cm])[jt]sx',
      ],
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    },
  ];
}
