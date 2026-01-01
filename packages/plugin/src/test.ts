import type { RuleTesterInitOptions, TestCasesOptions } from 'eslint-vitest-rule-tester';
import parser from '@typescript-eslint/parser';
import { run } from 'eslint-vitest-rule-tester';

export const runTests = (options: RuleTesterInitOptions & TestCasesOptions) => {
  void run({
    parser,
    ...options,
  });
};
