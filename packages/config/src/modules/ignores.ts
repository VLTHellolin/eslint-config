import type { FlatConfigItem } from '@hellolin-eslint/shared';
import { GlobIgnores } from '@hellolin-eslint/shared';
import gitignore, { type FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

export interface IgnoresOptions {
  /**
   * Custom files to ignore.
   */
  customFiles?: string[];
  /**
   * Options passed to `eslint-config-flat-gitignore`.
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignoreOptions?: Omit<FlatGitignoreOptions, 'name'>;
}

export const ignores = (options: IgnoresOptions = {}): FlatConfigItem[] => {
  const {
    customFiles = [],
    gitignoreOptions = {},
  } = options;

  return [
    {
      name: 'hellolin/ignores/base',
      ignores: [
        ...GlobIgnores,
        ...customFiles,
      ],
    },
    gitignore({
      name: 'hellolin/ignores/gitignore',
      strict: false,
      ...gitignoreOptions,
    }),
  ];
};
