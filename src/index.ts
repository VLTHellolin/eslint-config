import { javascript } from "./configs/javascript";
import { typescript } from "./configs/typescript";
import { resolveOptions } from "./options";
import { FlatConfig, Options } from "./types";

export function defineConfig(userOptions: Options, ...eslintOptions: FlatConfig) {
  const options = resolveOptions(userOptions);
  const presetConfig = [];

  presetConfig.push(javascript());
  if (options.typescript) {
    presetConfig.push(typescript(options));
  }

  const config = [
    ...presetConfig,
    ...eslintOptions,
  ];

  return config;
}

export default defineConfig;
