import type { FlatConfigItem } from '@hellolin-eslint/shared';
import createCommand from 'eslint-plugin-command/config';

export const commands = (): FlatConfigItem[] => {
  return [
    {
      ...createCommand(),
      name: 'hellolin/commands',
    },
  ];
};
