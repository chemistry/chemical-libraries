import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  parseVersion,
  bumpVersion,
  isMainVersionSeries,
  expandGlobPattern,
  getWorkspacePackages,
  updatePackageVersion,
} from './bump-versions.js';

function writeManifest(dir, manifest) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
}

describe('parseVersion', () => {
  it('parses a plain semver version', () => {
    expect(parseVersion('3.4.0')).toEqual({ major: 3, minor: 4, patch: 0, prerelease: '' });
  });

  it('parses a prerelease suffix', () => {
    expect(parseVersion('1.2.3-beta.1').prerelease).toBe('-beta.1');
  });

  it('throws on a non-semver string', () => {
    expect(() => parseVersion('3.4')).toThrow('Invalid version: 3.4');
  });
});

describe('bumpVersion', () => {
  it('bumps the patch segment', () => {
    expect(bumpVersion('3.4.0', 'patch')).toBe('3.4.1');
  });

  it('bumps minor and resets patch', () => {
    expect(bumpVersion('3.4.7', 'minor')).toBe('3.5.0');
  });

  it('bumps major and resets minor and patch', () => {
    expect(bumpVersion('3.4.7', 'major')).toBe('4.0.0');
  });

  it('falls back to a patch bump for an unknown type', () => {
    expect(bumpVersion('3.4.7', 'auto')).toBe('3.4.8');
  });

  it('drops the prerelease suffix when bumping', () => {
    expect(bumpVersion('3.4.0-rc.1', 'patch')).toBe('3.4.1');
  });
});

describe('isMainVersionSeries', () => {
  it('accepts the 3.x series', () => {
    expect(isMainVersionSeries('3.0.0')).toBe(true);
  });

  it('rejects other majors', () => {
    expect(isMainVersionSeries('2.9.9')).toBe(false);
    expect(isMainVersionSeries('4.0.0')).toBe(false);
  });
});

describe('workspace discovery against a fixture monorepo', () => {
  let root;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'bump-versions-'));
    writeManifest(root, {
      name: 'root',
      version: '3.4.0',
      private: true,
      workspaces: ['packages/*'],
    });
    writeManifest(join(root, 'packages', 'alpha'), { name: '@fixture/alpha', version: '3.4.0' });
    writeManifest(join(root, 'packages', 'beta'), { name: '@fixture/beta', version: '3.4.0' });
    writeManifest(join(root, 'packages', 'legacy'), { name: '@fixture/legacy', version: '2.1.0' });
    writeFileSync(join(root, 'packages', 'stray.txt'), 'not a package');
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('expands a trailing-star pattern to directories only', () => {
    const dirs = expandGlobPattern('packages/*', root).map((dir) => dir.replace(root, ''));
    expect(dirs.sort()).toEqual(['/packages/alpha', '/packages/beta', '/packages/legacy']);
  });

  it('returns an empty list for a missing base directory', () => {
    expect(expandGlobPattern('missing/*', root)).toEqual([]);
  });

  it('collects the root manifest plus every workspace package', () => {
    const packages = getWorkspacePackages(root);
    expect(packages[0].isRoot).toBe(true);
    expect(packages.map((pkg) => pkg.name).sort()).toEqual([
      '@fixture/alpha',
      '@fixture/beta',
      '@fixture/legacy',
      'root',
    ]);
  });

  it('rewrites only the version of a manifest', () => {
    const pkgPath = join(root, 'packages', 'alpha', 'package.json');
    const result = updatePackageVersion(pkgPath, '3.5.0');

    expect(result).toEqual({ oldVersion: '3.4.0', newVersion: '3.5.0' });

    const raw = readFileSync(pkgPath, 'utf-8');
    expect(JSON.parse(raw)).toEqual({ name: '@fixture/alpha', version: '3.5.0' });
    expect(raw.endsWith('\n')).toBe(true);
  });

  it('bumps every main-series package and leaves off-series ones alone', () => {
    const packages = getWorkspacePackages(root);
    const mainPackages = packages.filter((pkg) => isMainVersionSeries(pkg.version));
    const newVersion = bumpVersion(mainPackages[0].version, 'minor');

    for (const pkg of mainPackages) {
      updatePackageVersion(pkg.path, newVersion);
    }

    const read = (name) =>
      JSON.parse(readFileSync(join(root, 'packages', name, 'package.json'), 'utf-8')).version;

    expect(mainPackages).toHaveLength(3);
    expect(read('alpha')).toBe('3.5.0');
    expect(read('beta')).toBe('3.5.0');
    expect(read('legacy')).toBe('2.1.0');
  });
});
