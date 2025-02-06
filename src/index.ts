import { ignores } from './configs/ignores';
import { javascript } from './configs/javascript';
import { jsx } from './configs/jsx';
import { node } from './configs/node';
import { react } from './configs/react';
import { stylistic } from './configs/stylistic';
import { typescript } from './configs/typescript';
import { resolveOptions } from './options';
import type { FlatConfig, Options, ResolvedOptions } from './types';

export function defineConfig(userOptions?: Options, ...eslintOptions: FlatConfig) {
  const options = resolveOptions(userOptions);
  const presets: ((opt: ResolvedOptions) => FlatConfig)[] = [];

  presets.push(ignores);
  presets.push(jsx);
  presets.push(javascript);
  if (options.typescript) {
    presets.push(typescript);
  }
  if (options.react) {
    presets.push(react);
  }
  if (options.stylistic) {
    presets.push(stylistic);
  }
  presets.push(node);

  const presetConfig = presets.reduce<FlatConfig>(
    (res, fn) => res.concat(fn(options)),
    [],
  );
  const config: FlatConfig = [
    ...presetConfig,
    ...eslintOptions,
  ];

  return config;
}

export default defineConfig;
