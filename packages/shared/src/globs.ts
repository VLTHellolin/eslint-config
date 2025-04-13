export const GlobJS = '**/*.?([cm])js?(x)';
export const GlobTS = '**/*.?([cm])ts?(x)';
const GlobSourceExt = '?([cm])[jt]s?(x)';
export const GlobSource = `**/*.${GlobSourceExt}`;
export const GlobJson = '**/*.json';
export const GlobJsonc = '**/*.jsonc';
export const GlobJson5 = '**/*.json5';
export const GlobMarkdown = '**/*.md';
export const GlobStories = `**/*.stories.${GlobSourceExt}`;
export const GlobTests = [
  `**/*.test.${GlobSourceExt}`,
  `**/*.spec.${GlobSourceExt}`,
  `**/*.bench.${GlobSourceExt}`,
  `**/__tests__/${GlobSource}`,
];
export const GlobIgnores = [
  '**/dist',
  '**/out',
  '**/output',
  '**/coverage',
  '**/fixtures',
  '**/node_modules',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lock?(b)',
  '**/temp',
  '**/tmp',
  '**/.out',
  '**/.output',
  '**/.temp',
  '**/.tmp',
  '**/.history',
  '**/.next',
  '**/.nuxt',
  '**/.vitepress/cache',
  '**/.vercel',
  '**/.changeset',
  '**/.cache',
  '**/.yarn',
  '**/.idea',
  '**/.vite-inspect',
  '**/*.min.*',
  '**/auto-import?(s).d.ts',
  '**/LICENSE*',
];
