#!/usr/bin/env node

/**
 * check-pack.js
 *
 * Packaging validation for every published workspace: publint (strict),
 * are-the-types-wrong (esm-only profile) and a sanity check of the tarball
 * file list produced by `npm pack --dry-run --json`.
 *
 * Usage: node scripts/check-pack.js
 */

import { spawnSync } from 'child_process';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const binDir = join(rootDir, 'node_modules', '.bin');

// Mirrors the root build/publish order so cross-package dist deps exist when prepack rebuilds
const PUBLISH_ORDER = [
  '@chemistry/common',
  '@chemistry/elements',
  '@chemistry/space-groups',
  '@chemistry/math',
  '@chemistry/formula',
  '@chemistry/molecule',
];

const FORBIDDEN = [
  { label: 'test file', match: (path) => /(^|\/)[^/]+\.test\.[^/]+$/.test(path) },
  { label: 'snapshot', match: (path) => path.split('/').includes('__snapshots__') },
  { label: 'tsx file', match: (path) => path.endsWith('.tsx') },
];

/**
 * Expand simple glob pattern (e.g., "packages/*") to matching directories
 */
function expandGlobPattern(pattern) {
  if (pattern.endsWith('/*')) {
    const baseDir = join(rootDir, pattern.slice(0, -2));
    if (!existsSync(baseDir)) {
      return [];
    }

    return readdirSync(baseDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => join(baseDir, dirent.name));
  }

  const fullPath = join(rootDir, pattern);
  return existsSync(fullPath) ? [fullPath] : [];
}

/**
 * Map publishable workspace name to its directory
 */
function discoverPackages() {
  const rootManifest = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
  const byName = new Map();

  for (const dir of (rootManifest.workspaces || []).flatMap(expandGlobPattern)) {
    const manifestPath = join(dir, 'package.json');
    if (!existsSync(manifestPath)) {
      continue;
    }

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    if (manifest.private) {
      continue;
    }
    byName.set(manifest.name, dir);
  }

  return byName;
}

function run(command, args, cwd) {
  return spawnSync(command, args, { cwd, encoding: 'utf8' });
}

function fail(name, step, result, details = []) {
  console.error(`\n✖ ${name} — ${step} failed`);
  for (const detail of details) {
    console.error(`  - ${detail}`);
  }
  const output = [result?.stdout, result?.stderr].filter(Boolean).join('\n').trim();
  if (output) {
    console.error(`\n${output}`);
  }
  process.exit(1);
}

/**
 * Read the tarball file list; lifecycle script output may precede the JSON payload
 */
function packFileList(name) {
  const result = run('npm', ['pack', '--dry-run', '--json', '-w', name], rootDir);
  if (result.status !== 0) {
    return { result, files: null };
  }

  const start = result.stdout.indexOf('[');
  const end = result.stdout.lastIndexOf(']');
  if (start === -1 || end === -1) {
    return { result, files: null };
  }

  const parsed = JSON.parse(result.stdout.slice(start, end + 1));
  return { result, files: parsed[0].files.map((entry) => entry.path) };
}

function inspectFileList(files) {
  const problems = [];

  if (!files.includes('LICENSE')) {
    problems.push('LICENSE is missing');
  }
  if (!files.some((path) => path.startsWith('src/'))) {
    problems.push('no src/ entries');
  }

  for (const rule of FORBIDDEN) {
    const hits = files.filter(rule.match);
    if (hits.length > 0) {
      problems.push(`${rule.label} leaked: ${hits.join(', ')}`);
    }
  }

  return problems;
}

function main() {
  const packages = discoverPackages();
  const missing = PUBLISH_ORDER.filter((name) => !packages.has(name));
  if (missing.length > 0) {
    throw new Error(`Unknown workspace(s): ${missing.join(', ')}`);
  }

  const extra = [...packages.keys()].filter((name) => !PUBLISH_ORDER.includes(name));
  if (extra.length > 0) {
    throw new Error(`Not in PUBLISH_ORDER: ${extra.join(', ')}`);
  }

  console.log(`Validating ${PUBLISH_ORDER.length} packages...\n`);

  for (const name of PUBLISH_ORDER) {
    const dir = packages.get(name);

    const publint = run(join(binDir, 'publint'), ['run', '--strict'], dir);
    if (publint.status !== 0) {
      fail(name, 'publint', publint);
    }

    const attw = run(join(binDir, 'attw'), ['--pack', '--profile', 'esm-only', '.'], dir);
    if (attw.status !== 0) {
      fail(name, 'attw', attw);
    }

    const { result, files } = packFileList(name);
    if (files === null) {
      fail(name, 'npm pack', result);
    }

    const problems = inspectFileList(files);
    if (problems.length > 0) {
      fail(name, 'pack file list', null, problems);
    }

    console.log(`✔ ${name} — publint ok · attw ok · ${files.length} packed files, no leaks`);
  }

  console.log('\nPackage validation passed.');
}

main();
