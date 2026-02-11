# @hellolin-eslint/config 📐

[![NPM Version](https://img.shields.io/npm/v/%40hellolin-eslint%2Fconfig?style=flat-square)](https://npmjs.com/package/@hellolin-eslint/config)
[![GitHub Action](https://img.shields.io/github/actions/workflow/status/VLTHellolin/eslint-config/release.yaml?style=flat-square)](https://github.com/VLTHellolin/eslint-config/actions/workflows/release.yaml)

Opinionated ESLint config for frontend developers.

- 1 line of code === a pack of powerful rules that applies best practices and uses beautiful styles.
- Compose with your config easily using [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).
- Designed to work smoothly with TypeScript, Node.js, Markdown, JSON, YAML, etc.
- Optionally load modules such as [React](https://react.dev/), [Next.js](https://nextjs.org/), [UnoCSS](https://unocss.dev/), [Storybook](https://storybook.js.org/), etc.
- Format your source code comfortably using [ESLint Stylistic](https://eslint.style/).

## Usage

```shell
pnpm install -D eslint @hellolin-eslint/config
```

In your `eslint.config.js` (or `.ts`):

```js
import defineConfig from '@hellolin-eslint/config';

export default defineConfig();
```

## Customization

```js
import defineConfig from '@hellolin-eslint/config';

export default defineConfig({
  autoDetect: true,
  javascript: {
    env: {
      browser: true,
      webWorker: true,
    },
  },
  typescript: true,
  markdown: {
    type: 'commonmark',
  },
  react: {
    checkNonJSXFiles: true,
    additionalHooks: ['useAbortableEffect'],
  },
});
```

Some modules are not included in the main package `@hellolin-eslint/copnfig`. To use React features, for example, you need to install an additional plugin:

```shell
pnpm install -D @hellolin-eslint/react-config
```

Alternatively you can run the lint command once, and the CLI will prompt you to install missing dependencies automatically.

## Editor support

### VSCode

Make sure the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is installed, then add the following settings to `.vscode/settings.json`:

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

This project is inspired by [@antfu/eslint-config](https://github.com/antfu/eslint-config), [@sxzz/eslint-config](https://github.com/sxzz/eslint-config), and [eslint-config-sukka](https://github.com/SukkaW/eslint-config-sukka).

## License

Released under the [MIT License](https://github.com/VLTHellolin/eslint-config/blob/main/LICENSE).

Copyright © 2025 [hellolin](https://hellolin.top). All rights reserved.
