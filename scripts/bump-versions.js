#!/usr/bin/env node

/**
 * bump-versions.js
 *
 * Discovers packages dynamically from workspace config and bumps
 * all package versions in the monorepo.
 *
 * Usage: node scripts/bump-versions.js [patch|minor|major]
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

/**
 * Expand simple glob pattern (e.g., "packages/*") to matching directories
 */
function expandGlobPattern(pattern) {
  if (pattern.endsWith('/*')) {
    const baseDir = join(rootDir, pattern.slice(0, -2));
    if (!existsSync(baseDir)) return [];

    return readdirSync(baseDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => join(baseDir, dirent.name));
  }

  const fullPath = join(rootDir, pattern);
  return existsSync(fullPath) ? [fullPath] : [];
}

/**
 * Parse semver version string
 */
function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(-.*)?$/);
  if (!match) throw new Error(`Invalid version: ${version}`);
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] || '',
  };
}

/**
 * Bump version based on type
 */
function bumpVersion(version, type) {
  const v = parseVersion(version);
  switch (type) {
    case 'major':
      return `${v.major + 1}.0.0`;
    case 'minor':
      return `${v.major}.${v.minor + 1}.0`;
    case 'patch':
    default:
      return `${v.major}.${v.minor}.${v.patch + 1}`;
  }
}

/**
 * Check if package is in main version series (3.x.x)
 */
function isMainVersionSeries(version) {
  const v = parseVersion(version);
  return v.major === 3;
}

/**
 * Get all workspace packages from root package.json
 */
function getWorkspacePackages() {
  const rootPkgPath = join(rootDir, 'package.json');
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'));

  const packages = [];

  packages.push({
    path: rootPkgPath,
    name: rootPkg.name,
    version: rootPkg.version,
    isRoot: true,
  });

  const workspaces = rootPkg.workspaces || [];

  for (const pattern of workspaces) {
    const dirs = expandGlobPattern(pattern);

    for (const dir of dirs) {
      const pkgPath = join(dir, 'package.json');
      if (existsSync(pkgPath)) {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        packages.push({
          path: pkgPath,
          name: pkg.name,
          version: pkg.version,
          private: pkg.private || false,
          isRoot: false,
        });
      }
    }
  }

  return packages;
}

/**
 * Update version in package.json file
 */
function updatePackageVersion(pkgPath, newVersion) {
  const content = readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(content);
  const oldVersion = pkg.version;
  pkg.version = newVersion;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  return { oldVersion, newVersion };
}

function main() {
  const bumpType = process.argv[2] || 'patch';

  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    console.error('Usage: node bump-versions.js [patch|minor|major]');
    process.exit(1);
  }

  console.log(`Bump type: ${bumpType}`);
  console.log('');

  const packages = getWorkspacePackages();

  const mainPackages = packages.filter((pkg) => {
    try {
      return isMainVersionSeries(pkg.version);
    } catch {
      return false;
    }
  });

  if (mainPackages.length === 0) {
    console.error('No main version series packages found');
    process.exit(1);
  }

  const currentVersion = mainPackages[0].version;
  const newVersion = bumpVersion(currentVersion, bumpType);

  console.log(`Current version: ${currentVersion}`);
  console.log(`New version: ${newVersion}`);
  console.log('');
  console.log('Updating packages:');

  const updated = [];

  for (const pkg of mainPackages) {
    const result = updatePackageVersion(pkg.path, newVersion);
    console.log(`  ${pkg.name}: ${result.oldVersion} -> ${result.newVersion}`);
    updated.push({
      name: pkg.name,
      path: pkg.path,
      ...result,
    });
  }

  console.log('');
  console.log(`Updated ${updated.length} packages to version ${newVersion}`);

  console.log('');
  console.log(`NEW_VERSION=${newVersion}`);
}

try {
  main();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
