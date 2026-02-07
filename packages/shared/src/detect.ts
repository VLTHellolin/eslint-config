import { findUpSync } from 'find-up-simple';
import { isPackageExists } from 'local-pkg';

export const detectTypeScript = () => isPackageExists('typescript');

export const detectPnpm = () =>
  ['pnpm-lock.yaml', 'pnpm-workspace.yaml'].some(file => findUpSync(file));

export const detectNode = () =>
  ['@types/node', '@types/bun'].some(pkg => isPackageExists(pkg));
