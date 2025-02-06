import type { FlatConfig } from '../types';
import pluginPerfectionist from 'eslint-plugin-perfectionist';

export function perfectionist(): FlatConfig {
  return [
    {
      name: 'hellolin/perfectionist/rules',
      plugins: { perfectionist: pluginPerfectionist },
      rules: {
        'perfectionist/sort-exports': ['error', { type: 'natural' }],
        'perfectionist/sort-imports': ['error', {
          groups: [
            'type',
            ['parent-type', 'sibling-type', 'index-type', 'internal-type'],
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'object',
            'unknown',
          ],
          newlinesBetween: 'ignore',
          type: 'natural',
        }],
        'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
      },
    },
  ];
}
