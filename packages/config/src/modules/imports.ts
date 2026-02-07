import type { FlatConfigItem } from '@hellolin-eslint/shared';
import pluginImport from 'eslint-plugin-import-lite';

export interface ImportsOptions {
  /**
   * @default true
   */
  strict?: boolean;
}

export const imports = (options: ImportsOptions = {}): FlatConfigItem[] => {
  const {
    strict = true,
  } = options;

  return [
    {
      name: 'hellolin/imports',
      plugins: {
        import: pluginImport,
      },
      /// keep-sorted
      rules: {
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        ...strict ? {
          'import/first': 'error',
          'import/newline-after-import': ['error', { count: 1 }],
        } : {},
      },
    },
  ];
};
