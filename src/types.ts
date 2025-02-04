import type { Linter } from 'eslint';

export type FlatConfigItem = Linter.Config;
export type FlatConfig = FlatConfigItem[];

export type Rules = Partial<Linter.RulesRecord>;

export interface Options {
  typescript?: boolean | {
    strict?: boolean;
    stylistic?: boolean;
    enableAnyRelatedRules?: boolean;
  };
}

export type ResolvedOptions = Required<Options>;
