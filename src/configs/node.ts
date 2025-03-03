import type { FlatConfig, ResolvedOptions, Rules } from '../types';
import pluginNode from 'eslint-plugin-n';
import { extractOptionValue } from '../options';

export function node(options: ResolvedOptions): FlatConfig {
  const extraneousPackagesRules: Rules = extractOptionValue(options.node, 'disallowExtraneousPackages', false) ? {
    'node/no-extraneous-import': 'error',
    'node/no-extraneous-require': 'error',
  } : {};
  return [
    {
      name: 'hellolin/node/rules',
      plugins: { node: pluginNode },
      rules: {
        ...extraneousPackagesRules,
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': ['error', { ignoreTypeImport: true }],
        'node/no-unpublished-require': 'error',
        'node/process-exit-as-throw': 'error',
      },
    },
  ];
}
