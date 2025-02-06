import type { FlatConfig, ResolvedOptions } from '../types';
import pluginUnoCSS from '@unocss/eslint-plugin';
import { extractOptionValue } from '../options';

export function unocss(options: ResolvedOptions): FlatConfig {
  const enableStrict = extractOptionValue(options.unocss, 'strict', false);
  const enableAttributify = extractOptionValue(options.unocss, 'attributify', true);

  return [
    {
      name: 'hellolin/unocss/rules',
      plugins: { unocss: pluginUnoCSS as any },
      rules: {
        'unocss/order': 'warn',
        ...(enableStrict ? { 'unocss/blocklist': 'error' }: {}),
        ...(enableAttributify ? { 'unocss/order-attributify': 'warn' } : {}),
      },
    },
  ];
}
