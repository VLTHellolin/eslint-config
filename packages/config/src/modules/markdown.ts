import type { FlatConfigItem } from '@hellolin-eslint/shared';
import pluginMarkdown from '@eslint/markdown';

export interface MarkdownOptions {
  /**
   * @default 'gfm'
   */
  type?: 'commonmark' | 'gfm';
}

export const markdown = (options: MarkdownOptions = {}): FlatConfigItem[] => {
  const {
    type = 'gfm',
  } = options;

  return [
    {
      name: 'hellolin/markdown',
      plugins: { markdown: pluginMarkdown as any },
      processor: 'markdown/markdown',
      language: `markdown/${type}`,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      files: ['**/*.md'],
      /// keep-sorted
      rules: {
        'markdown/fenced-code-language': 'error',
        'markdown/heading-increment': 'warn',
        'markdown/no-empty-links': 'error',
        'markdown/no-invalid-label-refs': 'error',
        'markdown/no-missing-label-refs': 'error',
        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',
        'ts/no-require-imports': 'off',
        'ts/no-unused-expressions': 'off',
        'ts/no-unused-vars': 'off',
      },
    },
  ];
};
