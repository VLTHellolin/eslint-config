import type { FlatConfig, ResolvedOptions } from '../types';
import pluginMarkdown from '@eslint/markdown';
import { extractOptionValue } from '../options';

export function markdown(options: ResolvedOptions): FlatConfig {
  const markdownType = extractOptionValue(options.markdown, 'type', 'gfm');

  return [
    {
      name: 'hellolin/markdown/rules',
      plugins: { markdown: pluginMarkdown as any },
      processor: 'markdown/markdown',
      language: `markdown/${markdownType}`,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      files: ['**/*.md'],
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
}
