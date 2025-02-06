import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

export type FlatConfigItem = Linter.Config;
export type FlatConfig = FlatConfigItem[];

export type Rules = Partial<Linter.RulesRecord>;

export interface Options {
  ignores?: string[];
  gitignore?: boolean | Omit<FlatGitignoreOptions, 'name'>;
  typescript?: boolean | {
    strict?: boolean;
    stylistic?: boolean;
    enableAnyRelatedRules?: boolean;
    tsconfigRootDir?: string;
  };
  stylistic?: boolean;
  react?: boolean | {
    fastRefresh?: boolean;
    reactCompiler?: boolean;
  };
}

export type ResolvedOptions = Required<Options>;
