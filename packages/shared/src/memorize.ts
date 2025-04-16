declare global {
  // eslint-disable-next-line
  var __ESLINT_PLUGINS_MEMO__: Record<string, unknown> | undefined;
}

/**
 * Memorize plugins to make sure they are the same referential
 * identity, so that ESLint will not panic.
 * @param plugin The plugin to memorize.
 * @param key The unique key to the plugin.
 * @returns The plugin that guarantees to have the same referential
 * identity as before.
 * @see https://github.com/SukkaW/eslint-config-sukka/blob/master/packages/shared/src/memoize-eslint-plugin.ts
 */
export const memorize = <T extends NonNullable<unknown>>(plugin: T, key: string): T => {
  globalThis.__ESLINT_PLUGINS_MEMO__ ||= {};
  globalThis.__ESLINT_PLUGINS_MEMO__[key] ||= plugin;
  return globalThis.__ESLINT_PLUGINS_MEMO__[key] as T;
};
