import type { FlatConfig } from '../types';
import pluginNode from 'eslint-plugin-n';

export function node(): FlatConfig {
  return [
    {
      name: 'hellolin/node/rules',
      plugins: { node: pluginNode },
      rules: {
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-extraneous-import': 'error',
        'node/no-extraneous-require': 'error',
        'node/no-new-require': 'error',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': ['error', { ignoreTypeImport: true }],
        'node/no-unpublished-require': 'error',
        'node/process-exit-as-throw': 'error',
      },
    },
  ];
}
