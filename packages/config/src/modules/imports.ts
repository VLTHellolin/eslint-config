import type { FlatConfigItem } from '@hellolin-eslint/shared';
import pluginImport from 'eslint-plugin-import-lite';

export const imports = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/imports',
      plugins: {
        import: pluginImport,
      },
      /// keep-sorted
      rules: {
        'import/consistent-type-specifier-style': ['error', 'top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
      },
    },
  ];
};
