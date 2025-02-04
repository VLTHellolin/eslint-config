import { Options, ResolvedOptions } from './types';

export function resolveOptions(options: Options): ResolvedOptions {
  return {
    typescript: true,
    ...options,
  };
}
