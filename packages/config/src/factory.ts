import type { ReactOptions } from '@hellolin-eslint/react-config';
import type { FlatConfigItem } from '@hellolin-eslint/shared';
import type { UnoCSSOptions } from '@hellolin-eslint/unocss-config';
import type { IgnoresOptions } from './modules/ignores';
import type { JavaScriptOptions } from './modules/javascript';
import type { MarkdownOptions } from './modules/markdown';
import type { PnpmOptions } from './modules/pnpm';
import type { TypeScriptOptions } from './modules/typescript';
import { detectNode, detectPnpm } from '@hellolin-eslint/shared';
import { requirePackage } from '@hellolin-eslint/shared';
import { commands } from './modules/commands';
import { ignores } from './modules/ignores';
import { imports } from './modules/imports';
import { javascript } from './modules/javascript';
import { json } from './modules/json';
import { markdown } from './modules/markdown';
import { node } from './modules/node';
import { pnpm } from './modules/pnpm';
import { typescript } from './modules/typescript';
import { yaml } from './modules/yaml';

export interface ESLintConfigOptions {
  /**
   * Whether to enable auto-detect features for modules like `typescript`, `node` and `pnpm`.
   *
   * If enabled, the configuration will automatically apply when the corresponding environment is detected.
   * @default true
   */
  autoDetect?: boolean;
  /**
   * Environment settings.
   */
  env?: JavaScriptOptions['env'];
  /**
   * Custom configuration items to include.
   */
  customConfig?: FlatConfigItem[];
  ignores?: IgnoresOptions;
  typescript?: boolean | TypeScriptOptions;
  pnpm?: boolean | PnpmOptions;
  markdown?: boolean | MarkdownOptions;
  node?: boolean;
  react?: boolean | ReactOptions;
  reactCompiler?: boolean;
  storybook?: boolean;
  unocss?: boolean | UnoCSSOptions;
}

const resolveSubOptions = <T>(options: true | T): T =>
  options === true ? {} as T : options;

export const defineConfig = async (options: ESLintConfigOptions = {}): Promise<FlatConfigItem[]> => {
  const {
    autoDetect = true,
    env,
    customConfig = [],
    ignores: ignoresOptions = {},
    typescript: typescriptOptions = true,
    pnpm: pnpmOptions = autoDetect ? detectPnpm() : false,
    markdown: markdownOptions = true,
    node: nodeOptions = autoDetect ? detectNode() : false,
    react: reactOptions = false,
    reactCompiler: reactCompilerOptions = false,
    storybook: storybookOptions = false,
    unocss: unocssOptions = false,
  } = options;

  const config: FlatConfigItem[][] = [];

  config.push(
    ignores(ignoresOptions),
    javascript({ env }),
    commands(),
    imports(),
    json(),
    yaml(),
  );

  if (typescriptOptions) {
    config.push(
      typescript(resolveSubOptions(typescriptOptions)),
    );
  }

  if (pnpmOptions) {
    config.push(
      pnpm(resolveSubOptions(pnpmOptions)),
    );
  }

  if (markdownOptions) {
    config.push(
      markdown(resolveSubOptions(markdownOptions)),
    );
  }

  if (nodeOptions) {
    config.push(node());
  }
  if (reactOptions) {
    const { react } = await requirePackage('@hellolin-eslint/react-config');
    config.push(
      react(resolveSubOptions(reactOptions)),
    );
  }
  if (reactCompilerOptions) {
    const { reactCompiler } = await requirePackage('@hellolin-eslint/react-compiler-config');
    config.push(reactCompiler());
  }
  if (storybookOptions) {
    const { storybook } = await requirePackage('@hellolin-eslint/storybook-config');
    config.push(storybook());
  }
  if (unocssOptions) {
    const { unocss } = await requirePackage('@hellolin-eslint/unocss-config');
    config.push(unocss(resolveSubOptions(unocssOptions)));
  }

  return [...config.flat(), ...customConfig];
};
