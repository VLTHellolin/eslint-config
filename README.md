# @hellolin/eslint-config

[![NPM Version](https://img.shields.io/npm/v/%40hellolin%2Feslint-config?style=flat-square)](https://npmjs.com/package/@hellolin/eslint-config)
[![GitHub Action](https://img.shields.io/github/actions/workflow/status/VLTHellolin/eslint-config/release.yaml?style=flat-square)](https://github.com/VLTHellolin/eslint-config/actions/workflows/release.yaml)

Opinionated personal ESLint config for frontend developers.

- Compose with your config easily with the help of [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).
- [React](https://react.dev/), [Next.js](https://nextjs.org/), [UnoCSS](https://unocss.dev/) and [Storybook](https://storybook.js.org/) support by plugins.
- Format your source code comfortably using [ESLint Stylistic](https://eslint.style/) and [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format).
- Best practices included, simple usage for everyone.

## Usage

To use the config, make sure you have installed ESLint first:

```shell
pnpm install -D eslint @hellolin/eslint-config
```

Create a `eslint.config.js` (or `.ts`) in your project root:

```js
import defineConfig from '@hellolin/eslint-config';

export default defineConfig();
```

## Customization

You can pass your options to the `defineConfig` factory.

```js
import defineConfig from '@hellolin/eslint-config';

export default defineConfig({
  javascript: {
    sourceType: 'module',
    env: {
      browser: true,
    },
  },
  typescript: true,
  markdown: {
    type: 'commonmark',
  },
  react: {
    checkNonJSXFiles: true,
    additionalHooks: ['useAbortableEffect'],
    next: true,
    reactCompiler: true,
  },
  unocss: true,
  storybook: true,
});
```

By default, the most commonly used parts (JavaScript, TypeScript, Markdown, JSON, YAML, ...) are included in the main package `@hellolin/eslint-config`.

If you want to use Node.js, React, Storybook or UnoCSS features (i.e. enable the corresponding config item), you need to install additional plugins:

```shell
pnpm install -D @hellolin-eslint/react-config
pnpm install -D @hellolin-eslint/unocss-config
```

Or you can run the lint command once, and the CLI will prompt you to install the required but missing dependencies automatically.

## Editor support

### VSCode

To integrate with VSCode, install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), then add the following settings to `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "perfectionist/*", "severity": "off", "fixable": true },
    { "rule": "json/sort-*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "gql",
    "graphql",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

## Acknowledgements

This project is inspired by [@antfu/eslint-config](https://github.com/antfu/eslint-config) and [eslint-config-sukka](https://github.com/SukkaW/eslint-config-sukka).

## License

Released under the [MIT License](https://github.com/VLTHellolin/eslint-config/blob/main/LICENSE).

Copyright © 2025 [hellolin](https://hellolin.top). All rights reserved.
