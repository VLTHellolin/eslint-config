import { isPackageExists } from 'local-pkg';

export const requirePackage = async (name: string) => {
  if (!process.env.CI && process.stdout.isTTY && !isPackageExists(name)) {
    const { confirm } = await import('@clack/prompts');
    const prompt = await confirm({
      message: `An additional package is required for the config: ${name}. Install it now?`,
    });
    if (prompt) {
      const { installPackage } = await import('@antfu/install-pkg');
      await installPackage(name, { dev: true });
    }
  }

  return import(name);
};
