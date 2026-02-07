import type { FlatConfigItem } from '@hellolin-eslint/shared';
import { memorize } from '@hellolin-eslint/shared';
import pluginPnpm from 'eslint-plugin-pnpm';
import parserJson from 'jsonc-eslint-parser';
import parserYaml from 'yaml-eslint-parser';

export interface PnpmOptions {
  /**
   * Whether to enable `package.json` related checks.
   * @default true
   */
  packageJson?: boolean;
}

const memorizedPluginPnpm = memorize(pluginPnpm, 'eslint-plugin-pnpm');

export const pnpm = (options: PnpmOptions = {}): FlatConfigItem[] => {
  const {
    packageJson = true,
  } = options;

  return [
    ...packageJson ? [{
      name: 'hellolin/pnpm/package-json',
      files: [
        'package.json',
        '**/package.json',
      ],
      languageOptions: {
        parser: parserJson,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      /// keep-sorted
      rules: {
        'pnpm/json-prefer-workspace-settings': 'error',
        'pnpm/json-valid-catalog': 'error',
      },
    }] as FlatConfigItem[] : [],
    {
      name: 'hellolin/pnpm/pnpm-workspace-yaml',
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: parserYaml,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      /// keep-sorted
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'warn',
      },
    },
  ];
};
