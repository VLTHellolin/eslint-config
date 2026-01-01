import { runTests } from '../../test';
import rule from './index';

runTests({
  name: 'top-level-arrow-function',
  rule,
  valid: [
    'const func = () => {};',
    'const func = (x, y) => x + y;',
    'const func = async (x, y) => x + y;',
    'const func = <T extends number>(x: T, y: T): T => x + y;',
    'const func: FuncType = (x, y) => x + y;',
    'export const func = (x, y) => x + y;',
    'export default (x, y) => x + y;',
    ';(() => {})();',
  ],
  invalid: [
    [
      'function func() {}',
      'const func = () => {};',
    ],
    [
      'function func(x, y) { return x + y; }',
      'const func = (x, y) => { return x + y; };',
    ],
    [
      'export function func() {}',
      'export const func = () => {};',
    ],
    [
      'export default function() {}',
      'const anonymous = () => {};\nexport default anonymous;',
    ],
    [
      'function func<T extends number>(x: T, y: T): T { return x + y; }',
      'const func = <T extends number>(x: T, y: T): T => { return x + y; };',
    ],
    [
      'async function func(x, y) { return x + y; }',
      'const func = async (x, y) => { return x + y; };',
    ],
  ].map(c => ({
    code: c[0],
    output: c[1],
    errors: [{ messageId: 'topLevelArrowFunction' }],
  })),
});
