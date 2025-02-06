import type { FlatConfig, Options, ResolvedOptions } from './types';
import {
  format,
  ignores,
  javascript,
  jsx,
  next,
  node,
  perfectionist,
  react,
  regexp,
  stylistic,
  typescript,
  unocss,
} from './configs';
import { resolveOptions } from './options';

export function defineConfig(userOptions?: Options, ...eslintOptions: FlatConfig) {
  const options = resolveOptions(userOptions);
  const presets: ((opt: ResolvedOptions) => FlatConfig)[] = [];

  presets.push(ignores);
  presets.push(jsx);
  presets.push(javascript);
  if (options.typescript) {
    presets.push(typescript);
  }
  if (options.stylistic) {
    presets.push(stylistic);
    presets.push(perfectionist);
  }
  if (options.format) {
    presets.push(format);
  }
  presets.push(node);
  presets.push(regexp);
  if (options.react) {
    presets.push(react);
  }
  if (options.react && options.next) {
    presets.push(next);
  }
  if (options.unocss) {
    presets.push(unocss);
  }

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
