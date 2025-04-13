import { type FlatConfigItem, memorize } from '@hellolin-eslint/shared';
import pluginUnoCSS from '@unocss/eslint-plugin';

export const unocss = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/unocss',
      plugins: {
        unocss: memorize<any>(pluginUnoCSS, '@unocss/eslint-plugin'),
      },
      rules: {
        'unocss/blocklist': 'error',
        'unocss/order': 'warn',
        'unocss/order-attributify': 'warn',
      },
    },
  ];
};
