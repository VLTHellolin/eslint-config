import type { FlatConfig, Options, ResolvedOptions } from './types';
import {
  command,
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

type PresetFn = (opt: ResolvedOptions) => FlatConfig;

function resolvePreset(option: boolean | object, preset: PresetFn) {
  return option ? preset : () => [];
}

export function defineConfig(userOptions?: Options, ...eslintOptions: FlatConfig) {
  const options = resolveOptions(userOptions);
  const presets: PresetFn[] = [
    ignores,
    jsx,
    javascript,
    resolvePreset(options.typescript, typescript),
    resolvePreset(options.stylistic, stylistic),
    resolvePreset(options.stylistic, perfectionist),
    resolvePreset(options.format, format),
    resolvePreset(options.node, node),
    regexp,
    command,
    resolvePreset(options.react, react),
    resolvePreset(options.react && options.next, next),
    resolvePreset(options.unocss, unocss),
  ];

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

export * from './types';
