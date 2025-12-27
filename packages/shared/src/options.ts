import type { Linter } from 'eslint';

export type Preset = 'fast' | 'standard' | 'strict' | 'all';

export type FlatConfigItem = Linter.Config;
export type Rules = Partial<Linter.RulesRecord>;
