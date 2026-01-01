import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from '../../create-rule';

interface Options {
  allowExport?: boolean;
}

export default createRule<Options>({
  name: 'top-level-arrow-function',
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce top-level functions to be declared using the arrow function syntax',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allowExport: {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      topLevelArrowFunction: 'Top-level function should be declared using the arrow function syntax',
    },
  },
  create: context => {
    const options = context.options[0] || {};
    const { allowExport = false } = options;
    const source = context.sourceCode;

    return {
      FunctionDeclaration: node => {
        const parent = node.parent;
        const isNamedExport = parent.type === AST_NODE_TYPES.ExportNamedDeclaration;
        const isDefaultExport = parent.type === AST_NODE_TYPES.ExportDefaultDeclaration;
        const isExport = isNamedExport || isDefaultExport;

        const isTopLevel
          = parent.type === AST_NODE_TYPES.Program
            || (parent.parent.type === AST_NODE_TYPES.Program && isExport);

        if (!isTopLevel) return;
        if (allowExport && isExport) return;

        if (node.generator) return;

        context.report({
          node,
          messageId: 'topLevelArrowFunction',
          fix: fixer => {
            const isAsync = node.async;
            const functionName = node.id?.name || 'anonymous';
            const body = source.getText(node.body);
            const generic = node.typeParameters ? source.getText(node.typeParameters) : '';
            const returnType = node.returnType ? source.getText(node.returnType) : '';

            const params
              = node.params.length === 0
                ? ''
                : source.text.slice(node.params[0].range[0], node.params[node.params.length - 1].range[1]);

            let replacement: string;

            if (isNamedExport) {
              replacement = `export const ${functionName} = ${isAsync ? 'async ' : ''}${generic}(${params})${returnType} => ${body};`;
            } else if (isDefaultExport) {
              replacement = `const ${functionName} = ${isAsync ? 'async ' : ''}${generic}(${params})${returnType} => ${body};\nexport default ${functionName};`;
            } else {
              replacement = `const ${functionName} = ${isAsync ? 'async ' : ''}${generic}(${params})${returnType} => ${body};`;
            }

            return fixer.replaceText(isExport ? parent : node, replacement);
          },
        });
      },
    };
  },
});
