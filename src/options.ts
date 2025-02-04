import type { Options, ResolvedOptions } from './types';

export function resolveOptions(options?: Options): ResolvedOptions {
  return {
    ignores: [],
    gitignore: true,
    typescript: true,
    ...options,
  };
}
