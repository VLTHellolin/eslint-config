import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { Options as PrettierOptions } from 'prettier';

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
  format?: boolean | {
    css?: boolean;
    html?: boolean;
    markdown?: boolean;
    graphql?: boolean;
    options?: PrettierOptions;
  };
  react?: boolean | { fastRefresh?: boolean };
  next?: boolean;
  unocss?: boolean | {
    strict?: boolean;
    attributify?: boolean;
  };
}

export type ResolvedOptions = Required<Options>;
