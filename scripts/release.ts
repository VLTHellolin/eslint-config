import { $ } from 'execa';
import mri from 'mri';
import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release';

if (process.env.CI !== 'true') {
  process.exit(1);
}

const { version, dryRun, firstRelease, verbose } = mri(process.argv.slice(2), {
  string: ['version'],
  boolean: ['dryRun', 'firstRelease', 'verbose'],
  default: {
    version: undefined,
    dryRun: false,
    firstRelease: false,
    verbose: false,
  },
});

const { workspaceVersion, projectsVersionData, releaseGraph }
  = await releaseVersion({
    specifier: version,
    dryRun,
    firstRelease,
    verbose,
    stageChanges: true,
  });

if (!dryRun) {
  await $({ env: { ...process.env, SKIP_POSTINSTALL: 'true' } })`pnpm install`;
  await $`git add pnpm-lock.yaml`;
}

await releaseChangelog({
  releaseGraph,
  versionData: projectsVersionData,
  version: workspaceVersion,
  dryRun,
  firstRelease,
  verbose,
});

const publishResults = await releasePublish({
  releaseGraph,
  dryRun,
  firstRelease,
  verbose,
});

process.exit(
  Object.values(publishResults).some(r => r.code !== 0) ? 1 : 0,
);
