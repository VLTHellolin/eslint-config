import type { ReactOptions } from '@hellolin-eslint/react-config';
import { type FlatConfigItem, requirePackage } from '@hellolin-eslint/shared';
import { commands, type CommandsOptions } from './modules/commands';
import { ignores, type IgnoresOptions } from './modules/ignores';
import { javascript, type JavaScriptOptions } from './modules/javascript';
import { json } from './modules/json';
import { markdown, type MarkdownOptions } from './modules/markdown';
import { typescript, type TypeScriptOptions } from './modules/typescript';
import { yaml } from './modules/yaml';

export interface ESLintConfigOptions {
  ignores?: IgnoresOptions;
  commands?: CommandsOptions;
  javascript?: JavaScriptOptions;
  typescript?: boolean | TypeScriptOptions;
  json?: boolean;
  yaml?: boolean;
  markdown?: boolean | MarkdownOptions;
  node?: boolean;
  react?: boolean | ReactOptions;
  storybook?: boolean;
  unocss?: boolean;
}

const resolveOptions = <T extends object>(options?: T | boolean) =>
  typeof options === 'object'
    ? options : {} as T;

export const defineConfig = async (options: ESLintConfigOptions = {}): Promise<FlatConfigItem[]> => {
  const configs: FlatConfigItem[][] = [];

  configs.push(
    ignores(options.ignores),
    javascript(options.javascript),
    commands(options.commands),
  );

  if (options.typescript ?? true) {
    await requirePackage('typescript');
    configs.push(
      typescript(resolveOptions(options.typescript)),
    );
  }
  if (options.json ?? true) {
    configs.push(json());
  }
  if (options.yaml ?? true) {
    configs.push(yaml());
  }
  if (options.markdown ?? true) {
    configs.push(
      markdown(resolveOptions(options.markdown)),
    );
  }

  if (options.node ?? false) {
    const { node } = await requirePackage('@hellolin-eslint/node-config') as typeof import('@hellolin-eslint/node-config');
    configs.push(node());
  }
  if (options.react ?? false) {
    const { react } = await requirePackage('@hellolin-eslint/react-config') as typeof import('@hellolin-eslint/react-config');
    configs.push(
      react(resolveOptions(options.react)),
    );
  }
  if (options.storybook ?? false) {
    const { storybook } = await requirePackage('@hellolin-eslint/storybook-config') as typeof import('@hellolin-eslint/storybook-config');
    configs.push(storybook());
  }
  if (options.unocss ?? false) {
    const { unocss } = await requirePackage('@hellolin-eslint/unocss-config') as typeof import('@hellolin-eslint/unocss-config');
    configs.push(unocss());
  }

  return configs.flat();
};

export default defineConfig;
