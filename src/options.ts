import type { Options, ResolvedOptions } from './types';

export function resolveOptions(options?: Options): ResolvedOptions {
  return {
    ignores: [],
    gitignore: true,
    typescript: true,
    stylistic: true,
    format: true,
    react: false,
    next: false,
    unocss: false,
    node: true,
    storybook: false,
    ...options,
  };
}

export function extractOptionValue<T extends Record<string, any>, K extends keyof T>(option: boolean | T, key: K, defaultValue: T[K]) {
  if (typeof option === 'boolean') {
    return option ? defaultValue : false;
  } else {
    return option[key] ?? defaultValue;
  }
}
