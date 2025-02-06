import type { Options, ResolvedOptions } from './types';

export function resolveOptions(options?: Options): ResolvedOptions {
  return {
    ignores: [],
    gitignore: true,
    typescript: true,
    stylistic: true,
    react: false,
    next: false,
    unocss: false,
    ...options,
  };
}

export function extractOptionValue<T extends Record<string, any>>(option: boolean | T, key: keyof T, defaultValue: T[typeof key]) {
  if (typeof option === 'boolean') {
    return option ? defaultValue : false;
  } else {
    return option[key] ?? defaultValue;
  }
}
