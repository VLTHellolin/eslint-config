import pluginReact from '@eslint-react/eslint-plugin';
import { type FlatConfigItem, GlobJSX, GlobSource, GlobTSX, memorize } from '@hellolin-eslint/shared';
// @ts-expect-error
import pluginNext from '@next/eslint-plugin-next';
import pluginReactCompiler from 'eslint-plugin-react-compiler';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export interface ReactOptions {
  /**
   * Whether to check `.js` / `.ts` as well.
   * @default false
   */
  checkNonJSXFiles?: boolean;
  /**
   * Additional hooks to be considered as custom hooks that have dependencies.
   * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration
   * @default ['useIsomorphicLayoutEffect', 'useAbortableEffect']
   */
  additionalHooks?: string[];
  /**
   * Whether to enable Next.js related checks.
   * @default false
   */
  next?: boolean;
  /**
   * Whether to enable Remix related checks.
   * @default false
   */
  remix?: boolean;
  /**
   * Whether to enable `eslint-plugin-react-compiler`.
   * @see https://github.com/facebook/react/tree/main/compiler/packages/eslint-plugin-react-compiler
   * @default true
   */
  reactCompiler?: boolean;
  /**
   * Whether to enable `eslint-plugin-react-refresh`, or whether to allow constant exports in React files.
   * @see https://github.com/ArnaudBarre/eslint-plugin-react-refresh
   * @default true
   */
  reactFastRefresh?: boolean | {
    /**
     * @see https://github.com/ArnaudBarre/eslint-plugin-react-refresh#allowconstantexport-v040
     * @default true
     */
    allowConstantExport?: boolean;
  };
}

const memorizedPluginReact = memorize(pluginReact, '@eslint-react/eslint-plugin');
const memorizedReactPluginList = Object.fromEntries(
  Object.entries(memorizedPluginReact.configs.recommended.plugins).map(
    ([name, value]) => [
      name.replace('@eslint-react', 'react').replace('/', '-'),
      value,
    ],
  ),
);

export const react = (options: ReactOptions = {}): FlatConfigItem[] => {
  const {
    checkNonJSXFiles = false,
    additionalHooks = ['useIsomorphicLayoutEffect', 'useAbortableEffect'],
    next = false,
    remix = false,
    reactCompiler = true,
    reactFastRefresh = true,
  } = options;

  const allowConstantExport
    = typeof reactFastRefresh === 'object'
      ? (reactFastRefresh.allowConstantExport ?? true)
      : true;

  const configs: FlatConfigItem[] = [
    {
      name: 'hellolin/react',
      files: checkNonJSXFiles ? [GlobSource] : [GlobJSX, GlobTSX],
      plugins: {
        ...memorizedReactPluginList as any,
        'react-hooks': pluginReactHooks,
        'react-compiler': pluginReactCompiler,
        'react-refresh': pluginReactRefresh,
      },
      /// keep-sorted
      rules: {
        'react-compiler/react-compiler': reactCompiler ? 'error' : 'off',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'error',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'error',
        'react-dom/no-unsafe-iframe-sandbox': 'error',
        'react-dom/no-void-elements-with-children': 'error',
        'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
        'react-hooks-extra/no-direct-set-state-in-use-layout-effect': 'error',
        'react-hooks-extra/no-useless-custom-hooks': 'error',
        'react-hooks-extra/prefer-use-state-lazy-initialization': 'error',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: `(${additionalHooks.join('|')})`,
          },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-naming-convention/component-name': ['warn', { allowNamespace: true }],
        'react-naming-convention/use-state': 'warn',
        'react-refresh/only-export-components': [
          reactFastRefresh ? 'warn' : 'off',
          {
            allowConstantExport,
            allowExportNames: next ? [
              'dynamic',
              'dynamicParams',
              'revalidate',
              'fetchCache',
              'runtime',
              'preferredRegion',
              'maxDuration',
              'config',
              'generateStaticParams',
              'metadata',
              'generateMetadata',
              'viewport',
              'generateViewport',
            ] : (remix ? [
              'meta',
              'links',
              'headers',
              'loader',
              'action',
            ] : []),
          },
        ],
        'react-web-api/no-leaked-event-listener': 'error',
        'react-web-api/no-leaked-interval': 'error',
        'react-web-api/no-leaked-resize-observer': 'error',
        'react-web-api/no-leaked-timeout': 'error',
        'react/ensure-forward-ref-using-ref': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-count': 'error',
        'react/no-children-for-each': 'error',
        'react/no-children-map': 'error',
        'react/no-children-only': 'error',
        'react/no-children-prop': 'error',
        'react/no-children-to-array': 'error',
        'react/no-class-component': 'warn',
        'react/no-clone-element': 'error',
        'react/no-comment-textnodes': 'error',
        'react/no-complex-conditional-rendering': 'error',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'error',
        'react/no-create-ref': 'error',
        'react/no-default-props': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-jsx-props': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-leaked-conditional-rendering': 'error',
        'react/no-missing-key': 'error',
        'react/no-nested-components': 'error',
        'react/no-prop-types': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'error',
        'react/no-set-state-in-component-did-update': 'error',
        'react/no-set-state-in-component-will-update': 'error',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'error',
        'react/no-unsafe-component-will-receive-props': 'error',
        'react/no-unsafe-component-will-update': 'error',
        'react/no-unstable-context-value': 'error',
        'react/no-unstable-default-props': 'error',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-use-context': 'warn',
        'react/no-useless-fragment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',
      },
    },
  ];

  if (next) {
    configs.push({
      name: 'hellolin/next',
      files: checkNonJSXFiles ? [GlobSource] : [GlobJSX, GlobTSX],
      plugins: {
        next: pluginNext,
      },
      /// keep-sorted
      rules: {
        'next/google-font-display': 'warn',
        'next/google-font-preconnect': 'warn',
        'next/inline-script-id': 'error',
        'next/next-script-for-ga': 'warn',
        'next/no-assign-module-variable': 'error',
        'next/no-async-client-component': 'error',
        'next/no-before-interactive-script-outside-document': 'error',
        'next/no-css-tags': 'warn',
        'next/no-document-import-in-page': 'error',
        'next/no-duplicate-head': 'error',
        'next/no-head-import-in-document': 'error',
        'next/no-html-link-for-pages': 'error',
        'next/no-img-element': 'error',
        'next/no-page-custom-font': 'warn',
        'next/no-styled-jsx-in-document': 'warn',
        'next/no-sync-scripts': 'warn',
        'next/no-typos': 'warn',
        'next/no-unwanted-polyfillio': 'error',
      },
    });
  }

  return configs;
};
