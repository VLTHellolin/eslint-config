import { type FlatConfigItem, memorize } from '@hellolin-eslint/shared';
import pluginUnoCSS from '@unocss/eslint-plugin';

export interface UnoCSSOptions {
  /**
   * Whether to enable the attributify mode.
   * @default false
   */
  attributify?: boolean;
  /**
   * Whether to enforce class compile.
   * @default false
   */
  enforceClassCompile?: boolean;
}

export const unocss = (options: UnoCSSOptions = {}): FlatConfigItem[] => {
  const {
    attributify = false,
    enforceClassCompile = false,
  } = options;

  return [
    {
      name: 'hellolin/unocss',
      plugins: {
        unocss: memorize<any>(pluginUnoCSS, '@unocss/eslint-plugin'),
      },
      rules: {
        'unocss/blocklist': 'error',
        'unocss/order': 'warn',
        ...attributify ? { 'unocss/order-attributify': 'warn' } : {},
        ...enforceClassCompile ? { 'unocss/enforce-class-compile': 'warn' } : {},
      },
    },
  ];
};
