import { type FlatConfigItem, memorize } from '@hellolin-eslint/shared';
import pluginNode from 'eslint-plugin-n';

export const node = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/node',
      plugins: {
        n: memorize(pluginNode, 'eslint-plugin-n'),
      },
      rules: {
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-unpublished-bin': 'error',
        'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
        'n/no-unpublished-require': 'error',
        'n/process-exit-as-throw': 'error',
        'n/prefer-promises/dns': 'error',
      },
    },
  ];
};
