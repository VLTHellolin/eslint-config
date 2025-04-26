import { createRule } from '@hellolin-eslint/shared';

export default createRule({
  name: 'top-level-arrow-function',
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce top-level functions to be declared using the arrow function syntax',
      recommended: true,
    },
    schema: [],
    messages: {
      topLevelArrowFunction: 'Top-level function should be declared using the arrow function syntax',
    },
  },
  create: context => ({
    VariableDeclaration: node => {
      if (!['Program', 'ExportNamedDeclaration'].includes(node.parent.type)) return;
      if (node.declarations.length !== 1) return;

      const declaration = node.declarations[0];

      if (declaration.init?.type !== 'FunctionExpression') return;

      const body = declaration.init.body;
      const id = declaration.id;

      context.report({
        node,
        loc: {
          start: id.loc.start,
          end: body.loc.start,
        },
        messageId: 'topLevelArrowFunction',
      });
    },
  }),
});
