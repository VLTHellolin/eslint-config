import type { FlatConfigItem } from '@hellolin-eslint/shared';
import type { Command } from 'eslint-plugin-command/types';
import createCommand from 'eslint-plugin-command/config';

export interface CommandsOptions {
  /**
   * Custom commands to use.
   */
  commands?: Command[];
}

export const commands = (options: CommandsOptions = {}): FlatConfigItem[] => {
  const {
    commands = [],
  } = options;

  return [
    createCommand({
      name: 'hellolin/commands',
      commands,
    }),
  ];
};
