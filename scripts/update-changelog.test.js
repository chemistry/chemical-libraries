import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { getToday, createInitialChangelog, insertChangelogEntry } from './update-changelog.js';

const HEADER = `# Changelog

All notable changes to @chemistry/* libraries will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

`;

describe('getToday', () => {
  it('formats the current date as YYYY-MM-DD', () => {
    expect(getToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('insertChangelogEntry', () => {
  let dir;
  let path;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'update-changelog-'));
    path = join(dir, 'CHANGELOG.md');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('creates the file with a header when it does not exist', () => {
    expect(existsSync(path)).toBe(false);

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Fix a thing', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog).toContain('# Changelog');
    expect(changelog).toContain(`## [3.4.1] - ${getToday()}`);
    expect(changelog).toContain('- Fix a thing');
  });

  it('creates only the header via createInitialChangelog', () => {
    const content = createInitialChangelog(path);
    expect(readFileSync(path, 'utf-8')).toBe(content);
    expect(content).toContain('Semantic Versioning');
  });

  it('inserts a new entry directly after the header', () => {
    writeFileSync(path, HEADER);

    insertChangelogEntry('3.4.1', '### New Features\n- Add a thing', path);

    const changelog = readFileSync(path, 'utf-8');
    const headerEnd = changelog.indexOf('---\n') + 4;
    expect(changelog.indexOf('## [3.4.1]')).toBeGreaterThan(headerEnd);
  });

  it('preserves prior entries and puts the newest one first', () => {
    writeFileSync(path, `${HEADER}## [3.4.0] - 2026-08-01\n\n### New Features\n- Older entry\n\n`);

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Newer entry', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog).toContain('- Older entry');
    expect(changelog).toContain('- Newer entry');
    expect(changelog.indexOf('## [3.4.1]')).toBeLessThan(changelog.indexOf('## [3.4.0]'));
  });

  it('replaces heading and body when the version already exists', () => {
    writeFileSync(path, `${HEADER}## [3.4.1] - 2026-08-01\n\n### Bug Fixes\n- Stale text\n\n`);

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Fresh text', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog).toContain(`## [3.4.1] - ${getToday()}`);
    expect(changelog.match(/- Fresh text/g)).toHaveLength(1);
    expect(changelog).not.toContain('- Stale text');
    expect(changelog.match(/## \[3\.4\.1\]/g)).toHaveLength(1);
  });

  it('replaces a duplicate entry without disturbing the entries around it', () => {
    writeFileSync(
      path,
      `${HEADER}## [3.4.2] - 2026-08-02\n\n### Changes\n- Newest entry\n\n` +
        `## [3.4.1] - 2026-08-01\n\n### Bug Fixes\n- Stale text\n\n` +
        `## [3.4.0] - 2026-07-30\n\n### Changes\n- Oldest entry\n`
    );

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Fresh text', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog.match(/- Fresh text/g)).toHaveLength(1);
    expect(changelog).not.toContain('- Stale text');
    expect(changelog).toContain('- Newest entry');
    expect(changelog).toContain('- Oldest entry');
    expect(changelog.match(/^## \[/gm)).toHaveLength(3);
    expect(changelog.indexOf('## [3.4.2]')).toBeLessThan(changelog.indexOf('## [3.4.1]'));
    expect(changelog.indexOf('## [3.4.1]')).toBeLessThan(changelog.indexOf('## [3.4.0]'));
  });

  it('replaces the last entry cleanly when nothing follows it', () => {
    writeFileSync(
      path,
      `${HEADER}## [3.4.2] - 2026-08-02\n\n### Changes\n- Keep me\n\n` +
        `## [3.4.1] - 2026-08-01\n\n### Bug Fixes\n- Stale text\n`
    );

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Fresh text', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog.match(/- Fresh text/g)).toHaveLength(1);
    expect(changelog).not.toContain('- Stale text');
    expect(changelog).toContain('- Keep me');
    expect(changelog.match(/^## \[/gm)).toHaveLength(2);
  });

  it('does not treat regex replacement patterns in content as substitutions', () => {
    writeFileSync(path, `${HEADER}## [3.4.1] - 2026-08-01\n\n### Bug Fixes\n- Stale text\n\n`);

    insertChangelogEntry('3.4.1', "### Bug Fixes\n- Fix $& and $' parsing", path);

    expect(readFileSync(path, 'utf-8')).toContain("- Fix $& and $' parsing");
  });

  it('appends to a file that has no recognisable header', () => {
    writeFileSync(path, 'Some unrelated notes\n');

    insertChangelogEntry('3.4.1', '### Bug Fixes\n- Fix a thing', path);

    const changelog = readFileSync(path, 'utf-8');
    expect(changelog).toContain('Some unrelated notes');
    expect(changelog).toContain('## [3.4.1]');
  });
});
