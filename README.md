# @hellolin/eslint-config

[![NPM Version](https://img.shields.io/npm/v/%40hellolin%2Feslint-config?style=flat-square)](https://npmjs.com/package/@hellolin/eslint-config)

Opinionated personal ESLint config for React & Next.js developers.

- Compose with your config easily with the help of [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).
- [React](https://react.dev/), [Next.js](https://nextjs.org/) and [UnoCSS](https://unocss.dev/) support out-of-box.
- Format your source code comfortably using [ESLint Stylistic](https://eslint.style/) and [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format).
- Best practices included, simple usage for everyone.

## Usage

```shell
pnpm install -D eslint @hellolin/eslint-config
```

Then create a `eslint.config.js` in your project root:

```js
import defineConfig from '@hellolin/eslint-config';

export default defineConfig();
```

Then you can lint files:

```shell
pnpm exec eslint .
```

Optionally add it to your `package.json`:

```json
{
  // ...
  "scripts": {
    "lint": "eslint --fix ."
  }
  // ...
}
```

## Customization

You can pass your options to `defineConfig`.

For advanced usage, view [types.ts](https://github.com/VLTHellolin/eslint-config/blob/main/src/types.ts).

```js
import defineConfig from '@hellolin/eslint-config';

export default defineConfig({
  typescript: {
    // Strict checking (enabled by default)
    strict: true,
    // Enable rules related to any type
    enableAnyRelatedRules: true,
  },
  // Enable React support
  react: true,
  // Enable Next.js support
  next: true,
  // Enable UnoCSS support
  unocss: {
    // Attributify mode (enabled by default)
    attributify: true,
  },
  // Enable Storybook support (>=0.5.0)
  storybook: true,
  // JSON/JSONC/JSON5 mode
  json: {
    type: 'json5',
  },
  node: {
    // Disallow importing extraneous packages that isn't listed in package.json
    // This option is disabled by default because it cannot work properly in monorepo projects
    disallowExtraneousPackages: true,
  },
});
```

Notice that if you want to enable Next.js and UnoCSS features, you need to install their plugins:

```shell
# For Next.js
pnpm install -D @next/eslint-plugin-next
# For UnoCSS
pnpm install -D @unocss/eslint-plugin
```

You can also pass ESLint flat config items after the first parameter of `defineConfig`:

```js
import defineConfig from '@hellolin/eslint-config';

export default defineConfig(
  {
    react: true,
    next: true,
  },
  {
    files: ['**/*.?([cm])[jt]s?(x)'],
    rules: {
      'react/no-class-component': 'off',
      'react/no-complex-conditional-rendering': 'off',
    },
  },
);
```

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

This project is inspired by [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## License

Release under the [MIT License](https://github.com/VLTHellolin/eslint-config/blob/main/LICENSE).

Copyright © 2025 [hellolin](https://hellolin.top). All rights reserved.
