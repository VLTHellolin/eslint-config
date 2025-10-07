import defineRollupConfig from '@hellolin-eslint/rollup-config';

export default defineRollupConfig({
  input: 'src/index.ts',
  outputDir: 'dist',
  nodeResolve: true,
  externalLiveBindings: false,
});
