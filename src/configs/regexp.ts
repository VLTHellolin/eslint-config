import type { FlatConfig } from '../types';
import { configs } from 'eslint-plugin-regexp';

export function regexp(): FlatConfig {
  return [
    {
      name: 'hellolin/regexp/rules',
      ...configs['flat/recommended'],
    },
  ];
}
