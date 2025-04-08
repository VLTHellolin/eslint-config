import type { Linter } from 'eslint';

export type FlatConfigItem = Linter.Config;
export type Rules = Partial<Linter.RulesRecord>;
