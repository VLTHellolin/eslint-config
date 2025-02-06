import type { FlatConfig } from '../types';
// @ts-expect-error
import pluginNext from '@next/eslint-plugin-next';

export function next(): FlatConfig {
  return [
    {
      name: 'hellolin/next/setup',
      plugins: { next: pluginNext },
    },
    {
      name: 'hellolin/next/rules',
      files: [
        '**/*.?([cm])[jt]s?(x)',
      ],
      rules: {
        'next/google-font-display': 'warn',
        'next/google-font-preconnect': 'warn',
        'next/inline-script-id': 'error',
        'next/next-script-for-ga': 'warn',
        'next/no-assign-module-variable': 'error',
        'next/no-async-client-component': 'error',
        'next/no-before-interactive-script-outside-document': 'error',
        'next/no-css-tags': 'warn',
        'next/no-document-import-in-page': 'error',
        'next/no-duplicate-head': 'error',
        'next/no-head-import-in-document': 'error',
        'next/no-html-link-for-pages': 'error',
        'next/no-img-element': 'error',
        'next/no-page-custom-font': 'warn',
        'next/no-styled-jsx-in-document': 'warn',
        'next/no-sync-scripts': 'warn',
        'next/no-typos': 'warn',
        'next/no-unwanted-polyfillio': 'error',
      },
    },
  ];
}
