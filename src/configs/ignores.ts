import type { FlatConfig, ResolvedOptions } from '../types';
import gitignore from 'eslint-config-flat-gitignore';

export function ignores(options: ResolvedOptions): FlatConfig {
  const config: FlatConfig = [];

  if (options.gitignore !== false) {
    config.push(
      gitignore({
        name: 'hellolin/gitignore',
        ...(options.gitignore === true ? {} : options.gitignore),
      }),
    );
  }

  config.push({
    name: 'hellolin/ignores',
    ignores: [
      '**/node_modules',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '**/bun.lockb',
      '**/dist',
      '**/.temp',
      '**/.tmp',
      '**/.cache',
      '**/.history',
      '**/.next',
      '**/.vercel',
      '**/.changeset',
      '**/.idea',
      '**/.yarn',
      ...options.ignores,
    ],
  });

  return config;
}
