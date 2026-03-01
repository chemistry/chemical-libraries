#!/usr/bin/env node

/**
 * update-changelog.js
 *
 * Inserts a new changelog entry into CHANGELOG.md.
 *
 * Usage: node scripts/update-changelog.js <version> [changelog-content]
 *
 * If changelog-content is not provided, reads from stdin.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const changelogPath = join(rootDir, 'CHANGELOG.md');

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Create initial CHANGELOG.md if it doesn't exist
 */
function createInitialChangelog() {
  const content = `# Changelog

All notable changes to @chemistry/* libraries will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

`;
  writeFileSync(changelogPath, content);
  return content;
}

/**
 * Insert new entry into changelog
 */
function insertChangelogEntry(version, content) {
  let changelog;

  if (existsSync(changelogPath)) {
    changelog = readFileSync(changelogPath, 'utf-8');
  } else {
    changelog = createInitialChangelog();
  }

  const date = getToday();
  const newEntry = `## [${version}] - ${date}

${content}

`;

  const versionPattern = new RegExp(`^## \\[${version.replace(/\./g, '\\.')}\\]`, 'm');
  if (versionPattern.test(changelog)) {
    console.error(`Warning: Version ${version} already exists in CHANGELOG.md`);
    console.error('Updating existing entry...');

    const entryPattern = new RegExp(
      `## \\[${version.replace(/\./g, '\\.')}\\][^]*?(?=## \\[|---|\$)`,
      'm'
    );
    const updatedContent = changelog.replace(entryPattern, newEntry);
    writeFileSync(changelogPath, updatedContent);
    return;
  }

  const headerPattern = /^# Changelog[\s\S]*?Semantic Versioning[^\n]*\n+---\n/m;
  const headerMatch = changelog.match(headerPattern);

  if (headerMatch) {
    const insertPosition = headerMatch.index + headerMatch[0].length;
    const before = changelog.slice(0, insertPosition);
    const after = changelog.slice(insertPosition).replace(/^\n+/, '');

    const newChangelog = before + '\n' + newEntry + after;
    writeFileSync(changelogPath, newChangelog);
  } else {
    const firstEntryMatch = changelog.match(/^## \[/m);
    if (firstEntryMatch) {
      const insertPosition = firstEntryMatch.index;
      const before = changelog.slice(0, insertPosition);
      const after = changelog.slice(insertPosition);
      const newChangelog = before + newEntry + after;
      writeFileSync(changelogPath, newChangelog);
    } else {
      const newChangelog = changelog + '\n' + newEntry;
      writeFileSync(changelogPath, newChangelog);
    }
  }
}

/**
 * Read from stdin if available
 */
async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';

    if (process.stdin.isTTY) {
      resolve('');
      return;
    }

    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data.trim());
    });
    process.stdin.on('error', reject);

    setTimeout(() => {
      if (!data) {
        resolve('');
      }
    }, 100);
  });
}

async function main() {
  const version = process.argv[2];
  let content = process.argv[3];

  if (!version) {
    console.error('Usage: node update-changelog.js <version> [changelog-content]');
    console.error('');
    console.error('If changelog-content is not provided, reads from stdin:');
    console.error('  echo "### New Features\\n- Add feature X" | node update-changelog.js 3.0.1');
    process.exit(1);
  }

  if (!content) {
    content = await readStdin();
  }

  if (!content) {
    console.error('Error: No changelog content provided');
    console.error('Provide content as argument or pipe via stdin');
    process.exit(1);
  }

  console.log(`Updating CHANGELOG.md for version ${version}...`);
  console.log('');

  insertChangelogEntry(version, content);

  console.log(`Successfully updated CHANGELOG.md with version ${version}`);
  console.log(`Date: ${getToday()}`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
