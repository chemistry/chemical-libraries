#!/usr/bin/env node

/**
 * generate-changelog.js
 *
 * Calls Claude API with commit history to generate a formatted changelog.
 *
 * Usage: node scripts/generate-changelog.js <version>
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY - Required API key for Claude
 *
 * Output: Writes changelog to stdout
 */

import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';

const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 16000;

export const CHANGELOG_PROMPT = `You are a changelog generator for @chemistry/* — a set of open-source cheminformatics libraries for JavaScript.
The monorepo contains packages: @chemistry/common, @chemistry/elements, @chemistry/formula, @chemistry/math, @chemistry/molecule, @chemistry/space-groups.

Given the following git commits, generate a concise, user-friendly changelog entry.

Rules:
1. Group changes into these categories (only include categories that have changes):
   - **New Features** - New functionality
   - **Improvements** - Enhancements to existing features
   - **Bug Fixes** - Fixed issues
   - **Performance** - Performance improvements
   - **Documentation** - Doc changes (only if significant)
   - **Infrastructure** - CI/CD, build system changes (only if user-facing)

2. Write from a user's perspective - what does this mean for them?
3. Be concise - one line per change, no unnecessary details
4. Skip internal refactoring or cleanup that doesn't affect users
5. Use present tense ("Add" not "Added")
6. Start each item with a verb (Add, Fix, Improve, Update, etc.)
7. If there are no meaningful user-facing changes, output "No significant changes"

Format your response as markdown bullet points under each category heading.
Do NOT include the version number or date - just the categorized changes.

Example output format:
### New Features
- Add formula weight calculation to @chemistry/formula
- Add support for custom element data

### Bug Fixes
- Fix incorrect Van der Waals radius for element 109

Commits to analyze:
`;

/**
 * Build the full prompt sent to Claude for a set of commit lines
 */
export function buildChangelogPrompt(commits) {
  return CHANGELOG_PROMPT + '\n```\n' + commits + '\n```';
}

/**
 * Join the text blocks of an API response into a single string
 */
export function extractTextContent(message) {
  return message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();
}

/**
 * Get commits since the last tag
 */
export function getCommitsSinceLastTag() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""', {
      encoding: 'utf-8',
      cwd: process.cwd(),
    }).trim();

    let range;
    if (lastTag) {
      range = `${lastTag}..HEAD`;
      console.error(`Getting commits since tag: ${lastTag}`);
    } else {
      range = 'HEAD~50..HEAD';
      console.error('No tags found, getting last 50 commits');
    }

    const commits = execSync(
      `git log ${range} --pretty=format:"%h %s" --no-merges 2>/dev/null || echo ""`,
      {
        encoding: 'utf-8',
        cwd: process.cwd(),
      }
    ).trim();

    return commits;
  } catch (error) {
    console.error('Error getting commits:', error.message);
    return '';
  }
}

/**
 * Generate changelog using Claude API
 */
export async function generateChangelog(commits, client = new Anthropic()) {
  if (!commits || commits.trim() === '') {
    return 'No significant changes';
  }

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    // Low effort keeps adaptive thinking from consuming the text budget on this simple task
    output_config: { effort: 'low' },
    messages: [
      {
        role: 'user',
        content: buildChangelogPrompt(commits),
      },
    ],
  });

  const text = extractTextContent(message);
  if (!text) {
    throw new Error(`API returned no text (stop_reason: ${message.stop_reason})`);
  }
  return text;
}

export async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not set - cannot generate AI changelog');
    process.exit(1);
  }

  const version = process.argv[2];

  if (!version) {
    console.error('Usage: node generate-changelog.js <version>');
    console.error('Example: node generate-changelog.js 3.0.1');
    process.exit(1);
  }

  console.error(`Generating changelog for version ${version}...`);
  console.error('');

  const commits = getCommitsSinceLastTag();

  if (!commits) {
    console.error('No commits found since last tag');
    console.log('No significant changes');
    process.exit(0);
  }

  console.error('Commits found:');
  console.error(commits);
  console.error('');
  console.error('Calling Claude API...');

  try {
    const changelog = await generateChangelog(commits);
    console.error('');
    console.error('Generated changelog:');
    console.error('---');

    console.log(changelog);
  } catch (error) {
    console.error('Error generating changelog:');
    console.error(`  name: ${error?.name ?? 'Error'}`);
    if (error?.status !== undefined) {
      console.error(`  status: ${error.status}`);
    }
    console.error(`  message: ${error?.message ?? String(error)}`);
    process.exit(1);
  }
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  await main();
}
