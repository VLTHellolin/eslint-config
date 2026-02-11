import { type FlatConfigItem, GlobSource } from '@hellolin-eslint/shared';
import pluginJsdoc from 'eslint-plugin-jsdoc';

export const jsdoc = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/jsdoc',
      files: [GlobSource],
      plugins: {
        jsdoc: pluginJsdoc,
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
          ignorePrivate: true,
        },
      },
      /// keep-sorted
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-param-names': 'error',
        'jsdoc/check-property-names': 'error',
        'jsdoc/check-tag-names': ['error', { typed: true }],
        'jsdoc/empty-tags': 'warn',
        'jsdoc/multiline-blocks': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/no-types': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',
        'jsdoc/ts-no-empty-object-type': 'error',
      },
    },
  ];
};
