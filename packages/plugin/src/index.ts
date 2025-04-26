import type { ESLint } from 'eslint';
import { version } from '../package.json';
import topLevelArrowFunction from './rules/top-level-arrow-function';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'hellolin',
    version,
  },
  /// keep-sorted
  rules: {
    'top-level-arrow-function': topLevelArrowFunction,
  },
};

export default plugin;
