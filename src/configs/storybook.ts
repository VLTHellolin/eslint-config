import type { FlatConfig, ResolvedOptions, Rules } from '../types';
import importSync from 'import-sync';
import { extractOptionValue } from '../options';

export function storybook(options: ResolvedOptions): FlatConfig {
  const pluginStorybook = importSync('eslint-plugin-storybook');
  const enableCsf = extractOptionValue(options.storybook, 'csf', true);

  const csfRules: Rules = enableCsf ? {
    'storybook/csf-component': 'error',
    'storybook/no-stories-of': 'error',
    'storybook/no-title-property-in-meta': 'error',
  } : {};

  return [
    {
      name: 'hellolin/storybook/setup',
      plugins: { storybook: pluginStorybook },
    },
    {
      name: 'hellolin/storybook/rules',
      files: [
        '**/*.stories.?([cm])[jt]s?(x)',
      ],
      rules: {
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'error',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/no-uninstalled-addons': 'warn',
        'storybook/prefer-pascal-case': 'error',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
        ...csfRules,
      },
    },
  ];
}
