import type { FlatConfigItem } from '@hellolin-eslint/shared';
import { GlobStories, memorize } from '@hellolin-eslint/shared';
import pluginStorybook from 'eslint-plugin-storybook';

export const storybook = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/storybook',
      plugins: {
        storybook: memorize<any>(pluginStorybook, 'eslint-plugin-storybook'),
      },
      files: [GlobStories],
      /// keep-sorted
      rules: {
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/csf-component': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'error',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/no-stories-of': 'error',
        'storybook/no-title-property-in-meta': 'error',
        'storybook/no-uninstalled-addons': 'warn',
        'storybook/prefer-pascal-case': 'error',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
      },
    },
  ];
};
