import defineConfig from '@hellolin-eslint/config';

export default defineConfig({
  ignores: {
    files: [
      '**/docs.md',
    ],
  },
  env: {
    node: true,
  },
});
