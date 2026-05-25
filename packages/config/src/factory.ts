import type { react, ReactOptions } from '@hellolin-eslint/react-config';
import { detectNode, detectPnpm, detectTypeScript, type FlatConfigItem } from '@hellolin-eslint/shared';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { commands } from './modules/commands';
import { ignores, type IgnoresOptions } from './modules/ignores';
import { imports, type ImportsOptions } from './modules/imports';
import { javascript, type JavaScriptOptions } from './modules/javascript';
import { jsdoc } from './modules/jsdoc';
import { json } from './modules/json';
import { markdown, type MarkdownOptions } from './modules/markdown';
import { node } from './modules/node';
import { pnpm, type PnpmOptions } from './modules/pnpm';
import { typescript, type TypeScriptOptions } from './modules/typescript';
import { yaml } from './modules/yaml';
import { isInEditor } from './utils/is-in-editor';
import { requirePackage } from './utils/require-package';

export interface ConfigOptions {
  /**
   * Whether to enable auto-detect features for modules like `node` and `pnpm`.
   *
   * If enabled, the configuration will automatically apply when the corresponding environment is detected. Disabling it makes the config more performant after setting up the environment manually.
   * @default true
   */
  autoDetect?: boolean;
  /**
   * Environment settings.
   */
  env?: JavaScriptOptions['env'];
  ignores?: IgnoresOptions;
  typescript?: boolean | TypeScriptOptions;
  imports?: ImportsOptions;
  pnpm?: boolean | PnpmOptions;
  markdown?: boolean | MarkdownOptions;
  node?: boolean;
  react?: boolean | ReactOptions;
}

const isEnabled = (option: boolean | object | undefined, defaultOption: boolean = false): boolean => {
  if (typeof option === 'boolean') return option;
  if (typeof option === 'object') return true;
  return defaultOption;
};

const getOption = <T>(option: boolean | T | undefined): T | undefined => {
  if (typeof option === 'object') return option;
  return undefined;
};
const getTypeScriptOption = (option: boolean | TypeScriptOptions | undefined): TypeScriptOptions => {
  const inEditor = isInEditor();
  if (option === true) return { inEditor };
  if (typeof option === 'object') return { ...option, inEditor };
  return {};
};

type Awaitable<T> = T | Promise<T>;

export const config = (options: ConfigOptions = {}): FlatConfigComposer => {
  const autoDetect = options.autoDetect ?? true;

  const enableTypeScript = isEnabled(options.typescript, autoDetect && detectTypeScript());
  const enableNode = isEnabled(options.node, autoDetect && detectNode());
  const enablePnpm = isEnabled(options.pnpm, autoDetect && detectPnpm());

  const configs: Awaitable<FlatConfigItem[]>[] = [];

  configs.push(
    ignores(options.ignores),
    javascript({ env: options.env }),
    commands(),
    imports(options.imports),
    jsdoc(),
  );

  if (enableTypeScript) {
    configs.push(typescript(getTypeScriptOption(options.typescript)));
  }

  if (isEnabled(options.react)) {
    if (enableTypeScript) {
      const reactPlugin: Promise<ReturnType<typeof react>> = requirePackage('@hellolin-eslint/react-config').then(({ react }) => react(getOption(options.react)));
      configs.push(reactPlugin);
    } else {
      console.warn('[hellolin-eslint] The React configuration cannot be applied without TypeScript.');
    }
  }

  if (enableNode) {
    configs.push(node());
  }
  if (enablePnpm) {
    configs.push(pnpm(getOption(options.pnpm)));
  }

  if (isEnabled(options.markdown)) {
    configs.push(markdown(getOption(options.markdown)));
  }

  configs.push(
    json(),
    yaml(),
  );

  return new FlatConfigComposer().append(...configs);
};
