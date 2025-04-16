import { type FlatConfigItem, GlobJson, GlobJson5, GlobJsonc, memorize, type Rules } from '@hellolin-eslint/shared';
import pluginJson from 'eslint-plugin-jsonc';
import parserJson from 'jsonc-eslint-parser';

const jsonSharedOptions: FlatConfigItem = {
  plugins: {
    json: memorize<any>(pluginJson, 'eslint-plugin-jsonc'),
  },
  languageOptions: {
    parser: parserJson,
  },
};

/// keep-sorted
const jsonSharedRules: Rules = {
  'json/no-bigint-literals': 'error',
  'json/no-binary-expression': 'error',
  'json/no-binary-numeric-literals': 'error',
  'json/no-dupe-keys': 'error',
  'json/no-escape-sequence-in-identifier': 'error',
  'json/no-number-props': 'error',
  'json/no-numeric-separators': 'error',
  'json/no-octal-numeric-literals': 'error',
  'json/no-octal': 'error',
  'json/no-parenthesized': 'error',
  'json/no-regexp-literals': 'error',
  'json/no-sparse-arrays': 'error',
  'json/no-template-literals': 'error',
  'json/no-undefined-value': 'error',
  'json/no-unicode-codepoint-escapes': 'error',
  'json/no-useless-escape': 'error',
  'json/space-unary-ops': 'error',
  'json/vue-custom-block/no-parsing-error': 'error',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  'strict': 'off',
};

export const json = (): FlatConfigItem[] => {
  return [
    {
      name: 'hellolin/json/json',
      files: [GlobJson],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': 'error',
        'json/indent': ['error', 2],
        'json/no-comments': 'error',
        'json/no-floating-decimal': 'error',
        'json/no-hexadecimal-numeric-literals': 'error',
        'json/no-infinity': 'error',
        'json/no-multi-str': 'error',
        'json/no-nan': 'error',
        'json/no-plus-sign': 'error',
        'json/quote-props': 'error',
        'json/valid-json-number': 'error',
      },
    },
    {
      name: 'hellolin/json/jsonc',
      files: [GlobJsonc],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': ['error', 'always-multiline'],
        'json/no-floating-decimal': 'error',
        'json/no-hexadecimal-numeric-literals': 'error',
        'json/no-infinity': 'error',
        'json/no-multi-str': 'error',
        'json/no-nan': 'error',
        'json/no-plus-sign': 'error',
        'json/quote-props': 'error',
        'json/valid-json-number': 'error',
      },
    },
    {
      name: 'hellolin/json/json5',
      files: [GlobJson5],
      ...jsonSharedOptions,
      /// keep-sorted
      rules: {
        ...jsonSharedRules,
        'json/comma-dangle': ['error', 'always-multiline'],
        'json/quotes': ['error', 'single', { avoidEscape: true }],
      },
    },
    {
      name: 'hellolin/json/package-json',
      files: ['**/package.json'],
      /// keep-sorted
      rules: {
        'json/sort-array-values': [
          'error',
          {
            pathPattern: '^files$',
            order: { type: 'asc' },
          },
        ],
        'json/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'contributors',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^exports.*$',
            order: [
              'types',
              'import',
              'module',
              'require',
              'default',
            ],
          },
          {
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
            order: [
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc',
            ],
          },
        ],
      },
    },
    {
      name: 'hellolin/json/tsconfig-json',
      files: ['**/[jt]sconfig*.json'],
      rules: {
        'json/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
            ],
          },
          {
            pathPattern: '^compilerOptions$',
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',
              'libReplacement',
              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',
              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedDeclarations',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',
              'erasableSyntaxOnly',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
          },
        ],
      },
    },
  ];
};
