import type { FlatConfig, ResolvedOptions } from '../types';
import importSync from 'import-sync';
import { extractOptionValue } from '../options';

export function unocss(options: ResolvedOptions): FlatConfig {
  const pluginUnoCSS = importSync('@unocss/eslint-plugin');
  const enableStrict = extractOptionValue(options.unocss, 'strict', false);
  const enableAttributify = extractOptionValue(options.unocss, 'attributify', true);

  return [
    {
      name: 'hellolin/unocss/rules',
      plugins: { unocss: pluginUnoCSS },
      rules: {
        'unocss/order': 'warn',
        ...(enableStrict ? { 'unocss/blocklist': 'error' }: {}),
        ...(enableAttributify ? { 'unocss/order-attributify': 'warn' } : {}),
      },
    },
  ];
}
