import type { FlatConfigItem } from '@hellolin-eslint/shared';
import { GlobJSX, GlobTSX } from '@hellolin-eslint/shared';
import pluginReactCompiler from 'eslint-plugin-react-compiler';

export const reactCompiler = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/react-compiler',
      files: [GlobJSX, GlobTSX],
      plugins: {
        'react-compiler': pluginReactCompiler,
      },
      /// keep-sorted
      rules: {
        'react-compiler/react-compiler': 'error',
        'react-hooks/preserve-manual-memoization': 'error',
        'react-hooks/unsupported-syntax': 'warn',
      },
    },
  ];
};
