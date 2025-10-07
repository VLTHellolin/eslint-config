import type { GetManualChunk, RollupOptions } from 'rollup';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { builtinModules } from 'node:module';
import commonjsPlugin from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import dtsPlugin from 'rollup-plugin-dts';
import swcPlugin from 'rollup-plugin-swc3';

const manualChunks: GetManualChunk = (id: string, { getModuleInfo }) => {
  if (id.includes('node_modules')) {
    const info = getModuleInfo(id);
    if (info && info.dynamicImporters.length > 0) {
      return 'vendor';
    }
  }
};

export interface RollupConfigOptions {
  input: string;
  outputDir: string;
  packageJson?: string;
  nodeResolve?: boolean;
  json?: boolean;
  commonjs?: boolean;
  minify?: boolean;
  externalDependencies?: string[];
  /**
   * @see https://rollupjs.org/configuration-options/#output-externallivebindings
   * @default true
   */
  externalLiveBindings?: boolean;
}

export const defineRollupConfig = ({
  input,
  outputDir,
  packageJson = './package.json',
  nodeResolve = false,
  json = false,
  commonjs = true,
  minify = true,
  externalDependencies = [],
  externalLiveBindings = true,
}: RollupConfigOptions): RollupOptions[] => {
  const pkg = JSON.parse(readFileSync(packageJson, 'utf-8'));
  const externalModules = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...builtinModules,
    ...externalDependencies,
  ];
  const external = (id: string) => {
    return (
      externalModules.some(module => id === module || id.startsWith(`${module}/`))
      || id.startsWith('node:')
    );
  };

  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  return [
    {
      input,
      external,
      output: [
        {
          format: 'esm',
          dir: outputDir,
          entryFileNames: 'index.js',
          chunkFileNames: '[name]-[hash].js',
          compact: false,
          hoistTransitiveImports: false,
          minifyInternalExports: minify,
          generatedCode: {
            arrowFunctions: false,
            constBindings: true,
          },
          manualChunks,
          externalLiveBindings,
        },
      ],
      plugins: [
        nodeResolve && nodeResolvePlugin({
          preferBuiltins: true,
          exportConditions: ['node', 'module', 'import'],
        }),
        json && jsonPlugin({
          compact: true,
          preferConst: true,
        }),
        commonjs && commonjsPlugin({
          esmExternals: true,
          transformMixedEsModules: true,
        }),
        swcPlugin({
          isModule: true,
          minify,
          jsc: {
            target: 'es2020',
            parser: {
              syntax: 'typescript',
              decorators: true,
            },
            loose: false,
            externalHelpers: false,
            minify: minify ? {
              module: true,
              compress: {
                passes: 2,
                const_to_let: false,
              },
              mangle: true,
            } : {},
          },
          module: {
            type: 'es6',
            strict: false,
            strictMode: true,
            lazy: false,
          },
        }),
      ],
    },
    {
      input,
      external,
      output: {
        format: 'esm',
        dir: outputDir,
        entryFileNames: 'index.d.ts',
      },
      plugins: [
        dtsPlugin({
          compilerOptions: {
            preserveSymlinks: false,
          },
        }),
      ],
    },
  ];
};

export default defineRollupConfig;
