import type { FlatConfig, ResolvedOptions, Rules } from '../types';
import pluginReactDom from 'eslint-plugin-react-dom';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactHooksExtra from 'eslint-plugin-react-hooks-extra';
import pluginReactNamingConvention from 'eslint-plugin-react-naming-convention';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactWebApi from 'eslint-plugin-react-web-api';
import pluginReact from 'eslint-plugin-react-x';
import { extractOptionValue } from '../options';

export function react(options: ResolvedOptions): FlatConfig {
  const enableFastRefresh = extractOptionValue(options.react, 'fastRefresh', true);

  const plugins = {
    'react': pluginReact,
    'react-dom': pluginReactDom,
    'react-hooks': pluginReactHooks,
    'react-hooks-extra': pluginReactHooksExtra,
    'react-naming-convention': pluginReactNamingConvention,
    'react-web-api': pluginReactWebApi,
  } as any;
  if (enableFastRefresh) {
    plugins['react-refresh'] = pluginReactRefresh;
  }

  const standardRules: Rules = {
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
    'react-dom/no-void-elements-with-children': 'error',
    'react-dom/no-dangerously-set-innerhtml': 'warn',
    'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
    'react-dom/no-find-dom-node': 'error',
    'react-dom/no-missing-button-type': 'error',
    'react-dom/no-missing-iframe-sandbox': 'warn',
    'react-dom/no-namespace': 'error',
    'react-dom/no-render-return-value': 'error',
    'react-dom/no-script-url': 'error',
    'react-dom/no-unsafe-iframe-sandbox': 'error',
    'react-web-api/no-leaked-event-listener': 'error',
    'react-web-api/no-leaked-interval': 'error',
    'react-web-api/no-leaked-resize-observer': 'error',
    'react-web-api/no-leaked-timeout': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks-extra/no-useless-custom-hooks': 'error',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'error',
    'react-hooks-extra/no-direct-set-state-in-use-layout-effect': 'error',
    'react-hooks-extra/prefer-use-state-lazy-initialization': 'error',
    'react-naming-convention/component-name': ['warn', { allowNamespace: true }],
    'react-naming-convention/use-state': 'warn',
  };
  const fastRefreshRules: Rules = enableFastRefresh ? {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowExportNames: options.next ? [
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
        ] : [],
      },
    ],
  } : {};

  return [
    {
      name: 'hellolin/react/setup',
      plugins,
    },
    {
      name: 'hellolin/react/rules',
      files: [
        '**/*.?([cm])[jt]s?(x)',
      ],
      languageOptions: {
        parserOptions: { ecmaFeatures: { jsx: true } },
        sourceType: 'module',
      },
      rules: {
        ...standardRules,
        ...fastRefreshRules,
      },
    },
  ];
}
