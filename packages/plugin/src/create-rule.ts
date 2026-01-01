import type { TSESLint } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

export type Metadata<
  MessageIds extends string = string,
> = TSESLint.RuleMetaData<MessageIds, {
  recommended?: boolean;
}>;

export interface CustomRule<
  Options = unknown,
  MessageIds extends string = string,
> {
  readonly name: string;
  readonly meta: Metadata<MessageIds>;
  defaultOptions?: Options;
  create: (context: Readonly<TSESLint.RuleContext<MessageIds, Options[]>>, options: Options) => TSESLint.RuleListener;
}

export type ExportedCustomRule = Rule.RuleModule;

export const addDocsUrl = <T extends Metadata>(name: string, meta: T): T => ({
  ...meta,
  docs: {
    ...meta.docs,
    url: `https://github.com/VLTHellolin/eslint-config/blob/main/packages/plugin/src/rules/${name}/docs.md`,
  },
});

export const createRule = <
  Options = unknown,
  MessageIds extends string = string,
> ({
  name,
  meta,
  defaultOptions,
  create,
}: CustomRule<Options, MessageIds>): ExportedCustomRule => ({
  meta: addDocsUrl(name, meta),
  create: ((
    context: Readonly<TSESLint.RuleContext<MessageIds, Options[]>>,
  ) => {
    const options = context.options.map(current => ({
      ...defaultOptions,
      ...current,
    })) as Options;
    return create(context, options);
  }) as any,
});
