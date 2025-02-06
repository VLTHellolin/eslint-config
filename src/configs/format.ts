import type { Options as PrettierOptions } from 'prettier';
import type { FlatConfig, FlatConfigItem, ResolvedOptions } from '../types';
import { parseForESLint } from 'eslint-parser-plain';
import pluginFormat from 'eslint-plugin-format';
import { extractOptionValue } from '../options';

export function format(options: ResolvedOptions): FlatConfig {
  const enableCSS = extractOptionValue(options.format, 'css', true);
  const enableHTML = extractOptionValue(options.format, 'html', true);
  const enableMarkdown = extractOptionValue(options.format, 'markdown', true);
  const enableGraphQL = extractOptionValue(options.format, 'graphql', true);
  const userPrettierOptions = extractOptionValue(options.format, 'options', {});

  const prettierOptions: PrettierOptions = {
    semi: true,
    tabWidth: 2,
    singleQuote: true,
    quoteProps: 'consistent',
    trailingComma: 'all',
    arrowParens: 'avoid',
    ...userPrettierOptions,
  };

  const lang: [string, string][] = [];

  if (enableCSS) {
    lang.push(
      ['css', '**/*.?({p,post})css'],
      ['scss', '**/*.scss'],
      ['less', '**/*.less'],
    );
  }
  if (enableHTML) {
    lang.push(['html', '**/*.htm?(l)']);
  }
  if (enableMarkdown) {
    lang.push(['markdown', '**/*.md']);
  }
  if (enableGraphQL) {
    lang.push(['graphql', '**/*.{g,graph}ql']);
  }

  return [
    {
      name: 'hellolin/format/setup',
      plugins: { format: pluginFormat },
    },
    ...lang.map<FlatConfigItem>(e => ({
      name: `hellolin/format/${e[0]}`,
      files: [e[1]],
      languageOptions: { parser: { parseForESLint } },
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: e[0],
          },
        ],
      },
    })),
  ];
}
