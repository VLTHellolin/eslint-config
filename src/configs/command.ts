import type { FlatConfig } from '../types';
import createCommand from 'eslint-plugin-command/config';

export function command(): FlatConfig {
  return [
    {
      ...createCommand(),
      name: 'hellolin/command/rules',
    },
  ];
}
