import type { FlatConfigItem } from '@hellolin-eslint/shared';
import { GlobIgnores } from '@hellolin-eslint/shared';
import gitignore from 'eslint-config-flat-gitignore';

export interface IgnoresOptions {
  /**
   * Custom files to ignore.
   */
  files?: string[];
}

export const ignores = (options: IgnoresOptions = {}): FlatConfigItem[] => {
  const {
    files = [],
  } = options;

  return [
    {
      name: 'hellolin/ignores/base',
      ignores: [
        ...GlobIgnores,
        ...files,
      ],
    },
    gitignore({
      name: 'hellolin/ignores/gitignore',
      strict: false,
    }),
  ];
};
