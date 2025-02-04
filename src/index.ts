import { ignores } from "./configs/ignores";
import { javascript } from "./configs/javascript";
import { typescript } from "./configs/typescript";
import { resolveOptions } from "./options";
import { FlatConfig, Options, ResolvedOptions } from "./types";

export function defineConfig(userOptions?: Options, ...eslintOptions: FlatConfig) {
  const options = resolveOptions(userOptions);
  const presets: ((opt: ResolvedOptions) => FlatConfig)[] = [];

  presets.push(ignores);
  presets.push(javascript);
  if (options.typescript) {
    presets.push(typescript);
  }

  const presetConfig = presets.reduce<FlatConfig>(
    (res, fn) => res.concat(fn(options)),
    []
  );
  const config: FlatConfig = [
    ...presetConfig,
    ...eslintOptions,
  ];

  return config;
}

export default defineConfig;
